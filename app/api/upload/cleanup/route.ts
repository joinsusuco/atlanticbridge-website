import { errorResponse, jsonResponse } from "@/lib/security";
import {
  deleteStorageFiles,
  listExpiredPendingUploads,
  markUploadsDeleted,
} from "@/lib/supabase";

function isAuthorizedCleanupRequest(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : null;
  const headerToken = request.headers.get("x-cron-secret");

  return bearerToken === cronSecret || headerToken === cronSecret;
}

async function handleCleanup(request: Request) {
  if (!isAuthorizedCleanupRequest(request)) {
    return errorResponse("Unauthorized", 401);
  }

  try {
    const expiredUploads = await listExpiredPendingUploads(100);
    const expiredPaths = expiredUploads.map((upload) => upload.path);

    if (expiredPaths.length === 0) {
      return jsonResponse({
        success: true,
        message: "No expired pending uploads found.",
      });
    }

    const deleteResult = await deleteStorageFiles(expiredPaths);
    if (!deleteResult.success) {
      return errorResponse("Failed to delete expired uploads.", 500);
    }

    await markUploadsDeleted(expiredPaths);

    return jsonResponse({
      success: true,
      message: `Deleted ${expiredPaths.length} expired pending upload(s).`,
    });
  } catch (error) {
    return errorResponse("Failed to clean up expired uploads.", 500, error);
  }
}

export async function POST(request: Request) {
  return handleCleanup(request);
}

export async function GET() {
  return errorResponse("Method not allowed", 405);
}
