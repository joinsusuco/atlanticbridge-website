import { z } from "zod";
import { insertContact } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/resend";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  checkRateLimit,
  getRateLimitIdentifier,
  getRequestFingerprint,
  isHoneypotTriggered,
  isValidContentType,
  isValidOrigin,
  getClientMetadata,
  jsonResponse,
  errorResponse,
} from "@/lib/security";

// Zod schema for contact form validation
const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(30).optional(),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(5000),

  // Honeypot field (should be empty)
  website: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  // Validate Content-Type
  if (!isValidContentType(request)) {
    return errorResponse("Invalid content type", 415);
  }

  // Validate origin to prevent CSRF
  if (!isValidOrigin(request)) {
    return errorResponse("Invalid request origin", 403);
  }

  // Rate limiting: 10 requests per minute per IP
  const rateLimitId = getRateLimitIdentifier(request, "contact");
  const fingerprint = getRequestFingerprint(request);
  const rateLimit = checkRateLimit(rateLimitId, 10, 60000, fingerprint);

  if (rateLimit.limited) {
    return errorResponse(
      "Too many requests. Please try again later.",
      429
    );
  }

  try {
    // Parse JSON body
    const body = await request.json();

    // Check honeypot
    if (isHoneypotTriggered(body.website)) {
      // Silently accept to not alert bots, but don't process
      console.warn("Honeypot triggered on contact submission");
      return jsonResponse({ success: true, message: "Message sent successfully" });
    }

    // Validate with Zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      // Log validation errors without PII
      console.error("Contact validation failed:", result.error.issues.map(i => i.path.join(".")));
      return errorResponse("Invalid form data. Please check your inputs.", 400);
    }

    const data = result.data;

    // Sanitize all inputs
    const sanitizedData = {
      fullName: sanitizeText(data.fullName, 100),
      email: sanitizeEmail(data.email),
      phone: data.phone ? sanitizePhone(data.phone) : null,
      subject: sanitizeText(data.subject, 100),
      message: sanitizeText(data.message, 5000),
    };

    // Validate sanitized email
    if (!sanitizedData.email) {
      return errorResponse("Invalid email address", 400);
    }

    // Validate sanitized message
    if (!sanitizedData.message || sanitizedData.message.length < 10) {
      return errorResponse("Message is too short. Please provide more details.", 400);
    }

    // Get client metadata
    const { ipAddress, userAgent } = getClientMetadata(request);

    // Save to database
    const dbResult = await insertContact({
      full_name: sanitizedData.fullName,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (!dbResult.success) {
      console.error("Failed to save contact to database");
      return errorResponse("Failed to send message. Please try again.", 500);
    }

    // Send email notification (non-blocking)
    sendContactNotification({
      fullName: sanitizedData.fullName,
      email: sanitizedData.email,
      phone: sanitizedData.phone || undefined,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
    }).catch((error) => {
      // Log email failure but don't fail the request
      console.error("Failed to send contact notification email:", error);
    });

    return jsonResponse({
      success: true,
      message: "Message sent successfully. We will get back to you within 24 hours.",
    });
  } catch (error) {
    return errorResponse(
      "An unexpected error occurred. Please try again.",
      500,
      error
    );
  }
}

// Handle other methods
export async function GET() {
  return errorResponse("Method not allowed", 405);
}

export async function PUT() {
  return errorResponse("Method not allowed", 405);
}

export async function DELETE() {
  return errorResponse("Method not allowed", 405);
}
