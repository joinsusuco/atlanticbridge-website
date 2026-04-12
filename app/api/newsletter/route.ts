import { z } from "zod";
import { upsertNewsletterSubscriber } from "@/lib/supabase";
import {
  sanitizeEmail,
  sanitizeText,
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

// Zod schema for newsletter subscription validation
const newsletterSchema = z.object({
  email: z.string().email().max(254),
  source: z.string().max(50).optional().default("footer"),

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

  // Rate limiting: 3 requests per minute per IP (stricter for newsletter)
  const rateLimitId = getRateLimitIdentifier(request, "newsletter");
  const fingerprint = getRequestFingerprint(request);
  const rateLimit = checkRateLimit(rateLimitId, 3, 60000, fingerprint);

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
      console.warn("Honeypot triggered on newsletter subscription");
      return jsonResponse({ success: true, message: "Successfully subscribed to newsletter" });
    }

    // Validate with Zod
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      // Log validation errors without PII
      console.error("Newsletter validation failed:", result.error.issues.map(i => i.path.join(".")));
      return errorResponse("Please enter a valid email address.", 400);
    }

    const data = result.data;

    // Sanitize email
    const email = sanitizeEmail(data.email);
    const source = sanitizeText(data.source || "footer", 50);

    // Validate sanitized email
    if (!email) {
      return errorResponse("Please enter a valid email address.", 400);
    }

    // Get client metadata
    const { ipAddress, userAgent } = getClientMetadata(request);

    // Save to database (handles duplicates gracefully)
    const dbResult = await upsertNewsletterSubscriber(
      email,
      source,
      ipAddress,
      userAgent
    );

    if (!dbResult.success) {
      console.error("Failed to save newsletter subscriber:", dbResult.error);
      return errorResponse("Failed to subscribe. Please try again.", 500);
    }

    // Customize message based on whether it's a new subscriber
    const message = dbResult.isNew
      ? "Successfully subscribed to newsletter. Thank you for joining!"
      : "You're already subscribed. Thank you for your interest!";

    return jsonResponse({
      success: true,
      message,
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
