import { getShippingSchedules } from "@/lib/supabase";
import { checkRateLimit, getRateLimitIdentifier } from "@/lib/security";

export async function GET(request: Request) {
  // Rate limit: 120 requests per minute per IP (allows 60s polling + some buffer)
  const rateLimitId = getRateLimitIdentifier(request, "schedules");
  const rateLimit = checkRateLimit(rateLimitId, 120, 60000);
  if (rateLimit.limited) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const schedules = await getShippingSchedules();
  return Response.json(schedules, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
