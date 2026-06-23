import { timingSafeEqual } from "crypto";
import { getShippingSchedules, updateShippingSchedule } from "@/lib/supabase";
import {
  errorResponse,
  checkRateLimit,
  getRateLimitIdentifier,
  sanitizeText,
} from "@/lib/security";

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) {
    throw new Error("Missing ADMIN_PASSWORD environment variable");
  }
  return pw;
}

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const password = authHeader.replace("Bearer ", "");

  try {
    const expected = getAdminPassword();
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  // Rate limit: 10 attempts per minute
  const rateLimitId = getRateLimitIdentifier(request, "admin-login");
  const rateLimit = checkRateLimit(rateLimitId, 10, 60000);
  if (rateLimit.limited) {
    return errorResponse("Too many attempts. Try again later.", 429);
  }

  if (!isAuthorized(request)) {
    return errorResponse("Unauthorized", 401);
  }

  const schedules = await getShippingSchedules();
  return Response.json(schedules);
}

export async function PUT(request: Request) {
  // Rate limit: 20 updates per minute
  const rateLimitId = getRateLimitIdentifier(request, "admin-update");
  const rateLimit = checkRateLimit(rateLimitId, 20, 60000);
  if (rateLimit.limited) {
    return errorResponse("Too many requests. Try again later.", 429);
  }

  if (!isAuthorized(request)) {
    return errorResponse("Unauthorized", 401);
  }

  try {
    const body = await request.json();
    const { type, ...rawData } = body;

    if (type !== "container" && type !== "gp") {
      return errorResponse("Invalid schedule type", 400);
    }

    // Sanitize all inputs
    const data = {
      departure_date: sanitizeText(rawData.departure_date, 100),
      arrival_date: sanitizeText(rawData.arrival_date, 100),
      booking_deadline: sanitizeText(rawData.booking_deadline, 100),
      departure_port: sanitizeText(rawData.departure_port, 200),
      arrival_port: sanitizeText(rawData.arrival_port, 200),
      show_banner: rawData.show_banner === true,
    };

    const result = await updateShippingSchedule(type, data);

    if (!result.success) {
      return errorResponse("Failed to update schedule", 500);
    }

    return Response.json({ success: true });
  } catch {
    return errorResponse("Invalid request", 400);
  }
}
