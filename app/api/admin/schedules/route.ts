import { getShippingSchedules, updateShippingSchedule } from "@/lib/supabase";
import { errorResponse } from "@/lib/security";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kalajulas2026";

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const password = authHeader.replace("Bearer ", "");
  return password === ADMIN_PASSWORD;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return errorResponse("Unauthorized", 401);
  }

  const schedules = await getShippingSchedules();
  return Response.json(schedules);
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return errorResponse("Unauthorized", 401);
  }

  try {
    const body = await request.json();
    const { type, ...data } = body;

    if (type !== "container" && type !== "gp") {
      return errorResponse("Invalid schedule type", 400);
    }

    const result = await updateShippingSchedule(type, data);

    if (!result.success) {
      return errorResponse("Failed to update schedule", 500);
    }

    return Response.json({ success: true });
  } catch {
    return errorResponse("Invalid request", 400);
  }
}
