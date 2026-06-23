import { getShippingSchedules } from "@/lib/supabase";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const schedules = await getShippingSchedules();
  return Response.json(schedules);
}
