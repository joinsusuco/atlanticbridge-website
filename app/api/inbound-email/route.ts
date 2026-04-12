import { Resend } from "resend";
import { NextRequest } from "next/server";

const FORWARD_TO_EMAIL = "atlanticbridgeus@gmail.com";
const FROM_EMAIL = "Atlantic Bridge <noreply@atlanticbridgeus.com>";

// Lazy initialization of Resend client
let _resend: Resend | null = null;

function getResendClient(): Resend {
  if (_resend) return _resend;
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) throw new Error("Missing RESEND_API_KEY");
  _resend = new Resend(resendApiKey);
  return _resend;
}

type InboundEmailPayload = {
  object?: string;
  from?: string;
  to?: string[] | string;
  subject?: string;
  text?: string;
  html?: string;
  headers?: {
    from?: string;
    to?: string;
    subject?: string;
  };
};

function getInboundPayload(rawPayload: unknown): InboundEmailPayload {
  if (!rawPayload || typeof rawPayload !== "object") {
    return {};
  }

  const payload = rawPayload as Record<string, unknown>;

  // Be defensive in case the webhook body is wrapped by a platform or proxy.
  if (payload.data && typeof payload.data === "object") {
    return payload.data as InboundEmailPayload;
  }

  if (payload.email && typeof payload.email === "object") {
    return payload.email as InboundEmailPayload;
  }

  return payload as InboundEmailPayload;
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeRecipientList(value: unknown): string {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ");
  }

  return normalizeString(value);
}

function parseSender(headerFrom: string, topLevelFrom: string) {
  const fallbackEmail = topLevelFrom || "unknown@unknown.com";
  const fallbackName = fallbackEmail;

  if (!headerFrom) {
    return {
      senderName: fallbackName,
      senderEmail: fallbackEmail,
    };
  }

  const namedMatch = headerFrom.match(/^\s*"?(.*?)"?\s*<\s*([^<>@\s]+@[^<>@\s]+)\s*>\s*$/);
  if (namedMatch) {
    const [, rawName, rawEmail] = namedMatch;
    const cleanName = rawName.trim().replace(/^"|"$/g, "");

    return {
      senderName: cleanName || rawEmail,
      senderEmail: rawEmail.trim(),
    };
  }

  const bareEmailMatch = headerFrom.match(/([^\s<>@\u0000-\u001F]+@[^\s<>@\u0000-\u001F]+)/);
  if (bareEmailMatch) {
    const senderEmail = bareEmailMatch[1].trim();
    return {
      senderName: senderEmail,
      senderEmail,
    };
  }

  return {
    senderName: fallbackName,
    senderEmail: fallbackEmail,
  };
}

/**
 * Webhook endpoint for Resend inbound emails
 * Receives emails sent to info@atlanticbridgeus.com and forwards them to Gmail
 */
export async function POST(request: NextRequest) {
  try {
    const rawPayload = await request.json();
    const payload = getInboundPayload(rawPayload);

    const topLevelFrom = normalizeString(payload.from);
    const topLevelSubject = normalizeString(payload.subject);
    const topLevelText = normalizeString(payload.text);
    const topLevelHtml = normalizeString(payload.html);
    const headerFrom = normalizeString(payload.headers?.from);
    const headerTo = normalizeString(payload.headers?.to);
    const headerSubject = normalizeString(payload.headers?.subject);

    const { senderName, senderEmail } = parseSender(headerFrom, topLevelFrom);
    const recipient = normalizeRecipientList(payload.to) || headerTo || "unknown";
    const resolvedSubject = topLevelSubject || headerSubject || "No Subject";
    const resolvedText = topLevelText || "(No text content)";
    const resolvedHtml = topLevelHtml || "";

    // Build forwarded subject
    const forwardedSubject = `[Forwarded] ${resolvedSubject}`;

    // Build forwarded body
    const forwardedText = `
---------- Forwarded message ----------
From: ${senderName} <${senderEmail}>
To: ${recipient}
Subject: ${resolvedSubject}

${resolvedText}
`.trim();

    const forwardedHtml = resolvedHtml
      ? `
<div style="border-left: 2px solid #ccc; padding-left: 16px; margin-bottom: 16px; color: #666;">
  <p><strong>---------- Forwarded message ----------</strong></p>
  <p><strong>From:</strong> ${senderName} &lt;${senderEmail}&gt;</p>
  <p><strong>To:</strong> ${recipient}</p>
  <p><strong>Subject:</strong> ${resolvedSubject}</p>
</div>
${resolvedHtml}
`.trim()
      : undefined;

    // Forward the email to Gmail
    const { error } = await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: [FORWARD_TO_EMAIL],
      replyTo: senderEmail,
      subject: forwardedSubject,
      text: forwardedText,
      html: forwardedHtml,
    });

    if (error) {
      console.error("Failed to forward inbound email:", error);
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log(`Forwarded inbound email from ${senderEmail} to ${FORWARD_TO_EMAIL}`);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Inbound email webhook error:", error);
    return Response.json(
      { success: false, error: "Failed to process inbound email" },
      { status: 500 }
    );
  }
}

// Resend may send a GET request to verify the webhook
export async function GET() {
  return Response.json({ status: "ok", endpoint: "inbound-email-webhook" });
}
