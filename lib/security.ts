/**
 * Security utilities for API routes
 * - Input sanitization
 * - Rate limiting
 * - Honeypot validation
 * - Origin validation
 */

// ============================================
// HTML ESCAPING FOR EMAIL
// ============================================

/**
 * Escape HTML special characters to prevent injection in email templates
 */
export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

// ============================================
// INPUT SANITIZATION
// ============================================

/**
 * Sanitize text input to prevent XSS attacks
 * - Strips HTML tags
 * - Trims whitespace
 * - Limits length
 */
export function sanitizeText(
  input: unknown,
  maxLength: number = 5000
): string {
  if (typeof input !== "string") {
    return "";
  }

  return (
    input
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Remove script content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      // Trim whitespace
      .trim()
      // Limit length
      .slice(0, maxLength)
  );
}

/**
 * Sanitize email address
 * - Validates format
 * - Converts to lowercase
 * - Trims whitespace
 */
export function sanitizeEmail(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  const email = input.trim().toLowerCase();

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "";
  }

  return email.slice(0, 254); // Max email length per RFC 5321
}

/**
 * Sanitize phone number
 * - Allows digits, plus sign, hyphens, parentheses, spaces
 * - Removes other characters
 */
export function sanitizePhone(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .replace(/[^\d+\-() ]/g, "")
    .trim()
    .slice(0, 30);
}

/**
 * Sanitize an array of strings
 */
export function sanitizeStringArray(
  input: unknown,
  maxItems: number = 20
): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((item): item is string => typeof item === "string")
    .map((item) => sanitizeText(item, 200))
    .filter((item) => item.length > 0)
    .slice(0, maxItems);
}

// ============================================
// RATE LIMITING
// ============================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
  fingerprint?: string; // Additional fingerprinting
}

// In-memory rate limit store
// Note: In production with multiple instances, use Redis or Upstash
const rateLimitStore = new Map<string, RateLimitEntry>();

// Global abuse tracking - tracks suspicious patterns across IPs
const globalAbuseCounter = {
  count: 0,
  resetTime: Date.now() + 60000,
  maxGlobalPerMinute: 100, // Max total submissions per minute across all IPs
};

// Cleanup old entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
          rateLimitStore.delete(key);
        }
      }
      // Reset global counter
      if (now > globalAbuseCounter.resetTime) {
        globalAbuseCounter.count = 0;
        globalAbuseCounter.resetTime = now + 60000;
      }
    },
    5 * 60 * 1000
  );
}

/**
 * Check if a request is rate limited
 * Uses multiple signals: IP, fingerprint, and global limits
 * @param identifier - Unique identifier (e.g., IP address + endpoint)
 * @param maxRequests - Maximum requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @param fingerprint - Optional browser fingerprint for additional tracking
 * @returns Object with limited status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number = 60000,
  fingerprint?: string
): { limited: boolean; remaining: number; resetIn: number } {
  const now = Date.now();

  // Check global abuse limit first
  if (now > globalAbuseCounter.resetTime) {
    globalAbuseCounter.count = 0;
    globalAbuseCounter.resetTime = now + 60000;
  }
  globalAbuseCounter.count++;
  if (globalAbuseCounter.count > globalAbuseCounter.maxGlobalPerMinute) {
    return {
      limited: true,
      remaining: 0,
      resetIn: globalAbuseCounter.resetTime - now,
    };
  }

  // Check per-identifier limit
  const entry = rateLimitStore.get(identifier);

  // No existing entry or expired
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
      fingerprint,
    });
    return {
      limited: false,
      remaining: maxRequests - 1,
      resetIn: windowMs,
    };
  }

  // Check if over limit
  if (entry.count >= maxRequests) {
    return {
      limited: true,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  // Increment count
  entry.count += 1;
  rateLimitStore.set(identifier, entry);

  return {
    limited: false,
    remaining: maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

/**
 * Get rate limit identifier from request
 * Uses multiple signals for better abuse prevention
 */
export function getRateLimitIdentifier(
  request: Request,
  endpoint: string
): string {
  // Get IP - prefer cf-connecting-ip (Cloudflare) or vercel's header
  const cfIp = request.headers.get("cf-connecting-ip");
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  let ip = "unknown";

  // Priority: Cloudflare > Vercel > X-Forwarded-For > X-Real-IP
  // Cloudflare and Vercel headers are set by the platform and can't be spoofed
  if (cfIp) {
    ip = cfIp;
  } else if (vercelIp) {
    ip = vercelIp.split(",")[0].trim();
  } else if (process.env.NODE_ENV === "development" && forwardedFor) {
    // Only trust fallback proxy headers in development
    ip = forwardedFor.split(",")[0].trim();
  } else if (process.env.NODE_ENV === "development" && realIp) {
    ip = realIp;
  }

  // Normalize IP (remove port if present)
  ip = ip.replace(/:\d+$/, "");

  return `${endpoint}:${ip}`;
}

/**
 * Get a browser fingerprint from request headers
 * Used as secondary rate limit signal
 */
export function getRequestFingerprint(request: Request): string {
  const ua = request.headers.get("user-agent") || "";
  const acceptLang = request.headers.get("accept-language") || "";
  const accept = request.headers.get("accept") || "";

  // Create a simple hash of browser characteristics
  const fingerprint = `${ua.slice(0, 50)}|${acceptLang.slice(0, 20)}|${accept.slice(0, 30)}`;
  return fingerprint;
}

// ============================================
// HONEYPOT VALIDATION
// ============================================

/**
 * Check if honeypot field was filled (indicating a bot)
 * The honeypot field should be hidden via CSS and should remain empty
 * @param value - The value of the honeypot field
 * @returns true if the submission appears to be from a bot
 */
export function isHoneypotTriggered(value: unknown): boolean {
  // If the honeypot field has any value, it's likely a bot
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === "string" && value.trim() === "") {
    return false;
  }

  // Any non-empty value indicates a bot
  return true;
}

// ============================================
// REQUEST VALIDATION
// ============================================

/**
 * Validate that the request has the correct Content-Type
 */
export function isValidContentType(request: Request): boolean {
  const contentType = request.headers.get("content-type");
  return contentType?.includes("application/json") ?? false;
}

/**
 * Allowed origins for CSRF protection
 * Add your production domain(s) here
 */
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://atlanticbridgeus.com",
  "https://www.atlanticbridgeus.com",
  // Add staging/preview URLs if needed
];

/**
 * Validate origin/referer to prevent cross-site form submissions
 * Returns true if the request appears to come from an allowed origin
 */
export function isValidOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // In development, allow requests without origin (curl, Postman, etc)
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Check origin header first (most reliable)
  if (origin) {
    return ALLOWED_ORIGINS.includes(origin);
  }

  // Fall back to referer
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = refererUrl.origin;
      return ALLOWED_ORIGINS.includes(refererOrigin);
    } catch {
      return false;
    }
  }

  // No origin or referer - reject in production
  return false;
}

/**
 * Get client metadata from request
 */
export function getClientMetadata(request: Request): {
  ipAddress: string | null;
  userAgent: string | null;
} {
  // Prefer trusted headers from Cloudflare/Vercel
  const cfIp = request.headers.get("cf-connecting-ip");
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent");

  let ipAddress: string | null = null;

  if (cfIp) {
    ipAddress = cfIp;
  } else if (vercelIp) {
    ipAddress = vercelIp.split(",")[0].trim();
  } else if (process.env.NODE_ENV === "development" && forwardedFor) {
    ipAddress = forwardedFor.split(",")[0].trim();
  } else if (process.env.NODE_ENV === "development" && realIp) {
    ipAddress = realIp;
  }

  return {
    ipAddress,
    userAgent,
  };
}

// ============================================
// RESPONSE HELPERS
// ============================================

/**
 * Create a standardized JSON response
 */
export function jsonResponse(
  data: { success: boolean; message?: string; error?: string },
  status: number = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Create an error response with generic message (security best practice)
 */
export function errorResponse(
  publicMessage: string,
  status: number = 400,
  internalError?: unknown
): Response {
  // Log detailed error server-side
  if (internalError) {
    console.error("API Error:", internalError);
  }

  return jsonResponse(
    {
      success: false,
      error: publicMessage,
    },
    status
  );
}
