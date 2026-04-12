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

/**
 * Webhook endpoint for Resend inbound emails
 * Receives emails sent to info@atlanticbridgeus.com and forwards them to Gmail
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Resend inbound email payload structure
    const {
      from,
      to,
      subject,
      text,
      html,
      headers,
    } = payload;

    // Extract sender info
    const senderEmail = typeof from === "string" ? from : from?.email || "unknown@unknown.com";
    const senderName = typeof from === "object" ? from?.name || senderEmail : senderEmail;

    // Build forwarded subject
    const forwardedSubject = `[Forwarded] ${subject || "No Subject"}`;

    // Build forwarded body
    const forwardedText = `
---------- Forwarded message ----------
From: ${senderName} <${senderEmail}>
To: ${Array.isArray(to) ? to.join(", ") : to}
Subject: ${subject || "No Subject"}

${text || "(No text content)"}
`.trim();

    const forwardedHtml = html
      ? `
<div style="border-left: 2px solid #ccc; padding-left: 16px; margin-bottom: 16px; color: #666;">
  <p><strong>---------- Forwarded message ----------</strong></p>
  <p><strong>From:</strong> ${senderName} &lt;${senderEmail}&gt;</p>
  <p><strong>To:</strong> ${Array.isArray(to) ? to.join(", ") : to}</p>
  <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
</div>
${html}
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

    console.log(`Forwarded email from ${senderEmail} to ${FORWARD_TO_EMAIL}`);
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
