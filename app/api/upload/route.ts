import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { deleteStorageFiles, insertPendingUpload } from "@/lib/supabase";
import {
  checkRateLimit,
  createUploadToken,
  getRateLimitIdentifier,
  getRequestFingerprint,
  isValidOrigin,
  getClientMetadata,
  errorResponse,
} from "@/lib/security";

// Allowed MIME types and extensions
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Maximum files per request: 5
const MAX_FILES = 5;
const PENDING_UPLOAD_TTL_SECONDS = 24 * 60 * 60;

// Lazy initialization of Supabase client
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return _supabaseAdmin;
}

/**
 * Validate file MIME type by checking magic bytes
 */
function validateMagicBytes(buffer: ArrayBuffer): string | null {
  const bytes = new Uint8Array(buffer.slice(0, 12));

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "image/png";
  }

  // WebP: RIFF....WEBP
  if (
    bytes[0] === 0x52 && // R
    bytes[1] === 0x49 && // I
    bytes[2] === 0x46 && // F
    bytes[3] === 0x46 && // F
    bytes[8] === 0x57 && // W
    bytes[9] === 0x45 && // E
    bytes[10] === 0x42 && // B
    bytes[11] === 0x50 // P
  ) {
    return "image/webp";
  }

  // HEIC/HEIF: ISO Base Media File Format with compatible brand
  const extendedBytes = new Uint8Array(buffer.slice(0, 24));
  if (
    extendedBytes[4] === 0x66 && // f
    extendedBytes[5] === 0x74 && // t
    extendedBytes[6] === 0x79 && // y
    extendedBytes[7] === 0x70 // p
  ) {
    const brand = String.fromCharCode(
      extendedBytes[8],
      extendedBytes[9],
      extendedBytes[10],
      extendedBytes[11]
    );
    if (["heic", "heix", "hevc", "hevx", "mif1", "msf1"].includes(brand)) {
      return "image/heic";
    }
  }

  return null;
}

/**
 * Get file extension from filename
 */
function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return "";
  return filename.slice(lastDot).toLowerCase();
}

export async function POST(request: NextRequest) {
  // Validate origin to prevent CSRF
  if (!isValidOrigin(request)) {
    return errorResponse("Invalid request origin", 403);
  }

  // Rate limiting: 10 uploads per minute per IP
  const rateLimitId = getRateLimitIdentifier(request, "upload");
  const fingerprint = getRequestFingerprint(request);
  const rateLimit = checkRateLimit(rateLimitId, 10, 60000, fingerprint);

  if (rateLimit.limited) {
    return errorResponse("Too many uploads. Please try again later.", 429);
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return errorResponse("No files provided", 400);
    }

    if (files.length > MAX_FILES) {
      return errorResponse(`Maximum ${MAX_FILES} files allowed`, 400);
    }

    const { ipAddress } = getClientMetadata(request);
    const uploadedFiles: { path: string; filename: string; size: number; token: string }[] = [];

    for (const file of files) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return errorResponse(
          `File "${file.name}" exceeds maximum size of 5MB`,
          400
        );
      }

      // Validate file extension
      const extension = getFileExtension(file.name);
      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        return errorResponse(
          `File "${file.name}" has invalid extension. Allowed: JPG, PNG, WebP, HEIC`,
          400
        );
      }

      // Validate declared MIME type
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return errorResponse(
          `File "${file.name}" has invalid type. Allowed: JPG, PNG, WebP, HEIC`,
          400
        );
      }

      // Read file buffer and validate magic bytes
      const buffer = await file.arrayBuffer();
      const detectedType = validateMagicBytes(buffer);

      if (!detectedType) {
        return errorResponse(
          `File "${file.name}" content does not match declared type`,
          400
        );
      }

      const isHeicType = (type: string) => type === "image/heic" || type === "image/heif";
      const typesMatch =
        detectedType === file.type ||
        (isHeicType(detectedType) && isHeicType(file.type));

      if (!typesMatch) {
        return errorResponse(
          `File "${file.name}" content does not match declared type`,
          400
        );
      }

      // Generate unique filename with original extension
      const uniqueId = uuidv4();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").slice(0, 50);
      const storagePath = `quotes/pending/${uniqueId}/${safeName}`;

      // Upload to Supabase Storage
      const supabase = getSupabaseAdmin();
      const { error: uploadError } = await supabase.storage
        .from("quote-images")
        .upload(storagePath, buffer, {
          contentType: detectedType,
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return errorResponse("Failed to upload file. Please try again.", 500);
      }

      const pendingUpload = await insertPendingUpload({
        path: storagePath,
        filename: file.name,
        file_size: file.size,
        fingerprint,
        expires_at: new Date(Date.now() + PENDING_UPLOAD_TTL_SECONDS * 1000).toISOString(),
      });

      if (!pendingUpload.success) {
        await deleteStorageFiles([storagePath]);

        const setupIncomplete =
          pendingUpload.error?.includes("quote_uploads") ||
          pendingUpload.error?.includes("relation") ||
          pendingUpload.error?.includes("does not exist");

        if (setupIncomplete) {
          return errorResponse(
            "Image uploads are temporarily unavailable because upload tracking is not fully configured yet. You can continue without photos for now.",
            503
          );
        }

        return errorResponse("Failed to register uploaded file. Please try again.", 500);
      }

      uploadedFiles.push({
        path: storagePath,
        filename: file.name,
        size: file.size,
        token: createUploadToken({
          path: storagePath,
          filename: file.name,
          size: file.size,
          fingerprint,
        }, PENDING_UPLOAD_TTL_SECONDS),
      });
    }

    // Log upload for audit
    console.log(
      `Uploaded ${uploadedFiles.length} files from IP ${ipAddress}:`,
      uploadedFiles.map((f) => f.path)
    );

    return Response.json({
      success: true,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}

// Only allow POST
export async function GET() {
  return errorResponse("Method not allowed", 405);
}
