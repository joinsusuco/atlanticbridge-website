import { z } from "zod";
import { insertQuote } from "@/lib/supabase";
import { sendQuoteNotification } from "@/lib/resend";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeStringArray,
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

// Zod schema for quote validation
const quoteSchema = z.object({
  // Common fields
  serviceType: z.enum([
    "product-sourcing",
    "bulk-purchasing",
    "vehicle-procurement",
    "vehicle-shipping",
    "cargo-shipping",
  ]),
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(5).max(30),
  country: z.string().min(2).max(100),
  preferredContact: z.string().max(50).optional().default("email"),
  additionalNotes: z.string().max(5000).optional(),

  // Honeypot field (should be empty)
  website: z.string().max(500).optional(),

  // Product Sourcing fields
  productCategories: z.array(z.string().max(200)).max(20).optional(),
  productDetails: z.string().max(5000).optional(),
  productBudget: z.string().max(50).optional(),
  productTimeline: z.string().max(50).optional(),

  // Bulk Purchasing fields
  businessType: z.string().max(100).optional(),
  bulkCategories: z.array(z.string().max(200)).max(20).optional(),
  bulkDetails: z.string().max(5000).optional(),
  estimatedVolume: z.string().max(50).optional(),
  bulkFrequency: z.string().max(50).optional(),

  // Vehicle Procurement fields
  vehicleType: z.string().max(100).optional(),
  vehicleMake: z.string().max(100).optional(),
  vehicleModel: z.string().max(100).optional(),
  vehicleYearRange: z.string().max(50).optional(),
  vehicleMileage: z.string().max(50).optional(),
  vehicleBudget: z.string().max(50).optional(),
  vehicleCondition: z.string().max(50).optional(),

  // Vehicle Shipping fields
  hasVehicle: z.string().max(10).optional(),
  shippingVehicleInfo: z.string().max(2000).optional(),
  vehicleLocation: z.string().max(200).optional(),
  shippingMethod: z.string().max(50).optional(),
  vehicleRunning: z.string().max(10).optional(),

  // Cargo Shipping fields
  cargoDescription: z.string().max(5000).optional(),
  cargoPickupLocation: z.string().max(500).optional(),
  cargoEstimatedWeight: z.string().max(50).optional(),
  cargoDimensions: z.string().max(200).optional(),
  cargoDeliveryMethod: z.string().max(50).optional(),
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

  // Rate limiting: 5 requests per minute per IP
  const rateLimitId = getRateLimitIdentifier(request, "quote");
  const fingerprint = getRequestFingerprint(request);
  const rateLimit = checkRateLimit(rateLimitId, 5, 60000, fingerprint);

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
      console.warn("Honeypot triggered on quote submission");
      return jsonResponse({ success: true, message: "Quote request submitted successfully" });
    }

    // Validate with Zod
    const result = quoteSchema.safeParse(body);

    if (!result.success) {
      // Log validation errors without PII
      console.error("Quote validation failed:", result.error.issues.map(i => i.path.join(".")));
      return errorResponse("Invalid form data. Please check your inputs.", 400);
    }

    const data = result.data;

    // Sanitize all inputs
    const sanitizedData = {
      serviceType: data.serviceType,
      fullName: sanitizeText(data.fullName, 100),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      country: sanitizeText(data.country, 100),
      preferredContact: sanitizeText(data.preferredContact, 50),
      additionalNotes: data.additionalNotes ? sanitizeText(data.additionalNotes, 5000) : null,
    };

    // Validate sanitized email
    if (!sanitizedData.email) {
      return errorResponse("Invalid email address", 400);
    }

    // Build service-specific form data
    const formData: Record<string, unknown> = {};

    switch (data.serviceType) {
      case "product-sourcing":
        formData.productCategories = sanitizeStringArray(data.productCategories);
        formData.productDetails = sanitizeText(data.productDetails, 5000);
        formData.productBudget = sanitizeText(data.productBudget, 50);
        formData.productTimeline = sanitizeText(data.productTimeline, 50);
        break;

      case "bulk-purchasing":
        formData.businessType = sanitizeText(data.businessType, 100);
        formData.bulkCategories = sanitizeStringArray(data.bulkCategories);
        formData.bulkDetails = sanitizeText(data.bulkDetails, 5000);
        formData.estimatedVolume = sanitizeText(data.estimatedVolume, 50);
        formData.bulkFrequency = sanitizeText(data.bulkFrequency, 50);
        break;

      case "vehicle-procurement":
        formData.vehicleType = sanitizeText(data.vehicleType, 100);
        formData.vehicleMake = sanitizeText(data.vehicleMake, 100);
        formData.vehicleModel = sanitizeText(data.vehicleModel, 100);
        formData.vehicleYearRange = sanitizeText(data.vehicleYearRange, 50);
        formData.vehicleMileage = sanitizeText(data.vehicleMileage, 50);
        formData.vehicleBudget = sanitizeText(data.vehicleBudget, 50);
        formData.vehicleCondition = sanitizeText(data.vehicleCondition, 50);
        break;

      case "vehicle-shipping":
        formData.hasVehicle = sanitizeText(data.hasVehicle, 10);
        formData.shippingVehicleInfo = sanitizeText(data.shippingVehicleInfo, 2000);
        formData.vehicleLocation = sanitizeText(data.vehicleLocation, 200);
        formData.shippingMethod = sanitizeText(data.shippingMethod, 50);
        formData.vehicleRunning = sanitizeText(data.vehicleRunning, 10);
        break;

      case "cargo-shipping":
        formData.cargoDescription = sanitizeText(data.cargoDescription, 5000);
        formData.cargoPickupLocation = sanitizeText(data.cargoPickupLocation, 500);
        formData.cargoEstimatedWeight = sanitizeText(data.cargoEstimatedWeight, 50);
        formData.cargoDimensions = sanitizeText(data.cargoDimensions, 200);
        formData.cargoDeliveryMethod = sanitizeText(data.cargoDeliveryMethod, 50);
        break;
    }

    // Get client metadata
    const { ipAddress, userAgent } = getClientMetadata(request);

    // Save to database
    const dbResult = await insertQuote({
      service_type: sanitizedData.serviceType,
      full_name: sanitizedData.fullName,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      country: sanitizedData.country,
      preferred_contact: sanitizedData.preferredContact,
      additional_notes: sanitizedData.additionalNotes,
      form_data: formData,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (!dbResult.success) {
      console.error("Failed to save quote to database");
      return errorResponse("Failed to submit quote. Please try again.", 500);
    }

    // Send email notification (non-blocking)
    sendQuoteNotification({
      serviceType: sanitizedData.serviceType,
      fullName: sanitizedData.fullName,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      country: sanitizedData.country,
      preferredContact: sanitizedData.preferredContact,
      additionalNotes: sanitizedData.additionalNotes || undefined,
      formData,
    }).catch((error) => {
      // Log email failure but don't fail the request
      console.error("Failed to send quote notification email:", error);
    });

    return jsonResponse({
      success: true,
      message: "Quote request submitted successfully. We will contact you within 1-2 business days.",
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
