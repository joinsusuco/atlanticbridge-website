import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Database types
export interface QuoteRecord {
  id: string;
  created_at: string;
  service_type:
    | "product-sourcing"
    | "bulk-purchasing"
    | "vehicle-procurement"
    | "vehicle-shipping"
    | "cargo-shipping";
  status: "new" | "contacted" | "quoted" | "closed";
  full_name: string;
  email: string;
  phone: string;
  country: string;
  preferred_contact: string;
  additional_notes: string | null;
  form_data: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
}

export interface ContactRecord {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  ip_address: string | null;
  user_agent: string | null;
}

export interface NewsletterSubscriberRecord {
  id: string;
  created_at: string;
  email: string;
  subscribed: boolean;
  source: string;
  unsubscribed_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface QuoteUploadRecord {
  id: string;
  created_at: string;
  expires_at: string;
  path: string;
  filename: string;
  file_size: number;
  fingerprint: string;
  quote_id: string | null;
  attached_at: string | null;
  deleted_at: string | null;
}

// Input types for inserts (without auto-generated fields)
export type QuoteInsert = Omit<QuoteRecord, "id" | "created_at">;
export type ContactInsert = Omit<ContactRecord, "id" | "created_at">;
export type NewsletterSubscriberInsert = Omit<NewsletterSubscriberRecord, "id" | "created_at">;
export type QuoteUploadInsert = Omit<QuoteUploadRecord, "id" | "created_at" | "quote_id" | "attached_at" | "deleted_at"> & {
  quote_id?: string | null;
  attached_at?: string | null;
  deleted_at?: string | null;
};

// Lazy initialization of Supabase client
let _supabaseAdmin: SupabaseClient | null = null;

/**
 * Get the Supabase admin client (lazy initialization)
 * This prevents build-time errors when env vars aren't set
 */
function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) {
    return _supabaseAdmin;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }

  if (!supabaseServiceKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  }

  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _supabaseAdmin;
}

/**
 * Server-side Supabase client using service role key
 * Use this in API routes for full database access
 *
 * IMPORTANT: Never expose the service role key to the client
 */
export const supabaseAdmin = {
  from: (table: string) => getSupabaseAdmin().from(table),
  storage: {
    from: (bucket: string) => getSupabaseAdmin().storage.from(bucket),
  },
};

/**
 * Helper to insert a quote record
 */
export async function insertQuote(
  data: Omit<QuoteRecord, "id" | "created_at" | "status">
): Promise<{ success: boolean; id?: string; error?: string }> {
  const insertData: QuoteInsert = { ...data, status: "new" };

  const { data: result, error } = await getSupabaseAdmin()
    .from("quotes")
    .insert(insertData)
    .select("id")
    .single();

  if (error) {
    console.error("Failed to insert quote:", error);
    return { success: false, error: error.message };
  }

  return { success: true, id: (result as { id: string })?.id };
}

/**
 * Helper to insert a contact record
 */
export async function insertContact(
  data: Omit<ContactRecord, "id" | "created_at" | "status">
): Promise<{ success: boolean; id?: string; error?: string }> {
  const insertData: ContactInsert = { ...data, status: "new" };

  const { data: result, error } = await getSupabaseAdmin()
    .from("contacts")
    .insert(insertData)
    .select("id")
    .single();

  if (error) {
    console.error("Failed to insert contact:", error);
    return { success: false, error: error.message };
  }

  return { success: true, id: (result as { id: string })?.id };
}

/**
 * Helper to insert or update newsletter subscriber
 * Returns success even if email already exists (reactivates subscription)
 */
export async function upsertNewsletterSubscriber(
  email: string,
  source: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<{ success: boolean; isNew: boolean; error?: string }> {
  const client = getSupabaseAdmin();

  // First check if subscriber exists
  const { data: existing } = await client
    .from("newsletter_subscribers")
    .select("id, subscribed")
    .eq("email", email)
    .single();

  const existingRecord = existing as { id: string; subscribed: boolean } | null;

  if (existingRecord) {
    // Reactivate if previously unsubscribed
    if (!existingRecord.subscribed) {
      const { error } = await client
        .from("newsletter_subscribers")
        .update({
          subscribed: true,
          unsubscribed_at: null,
          source,
          ip_address: ipAddress,
          user_agent: userAgent,
        })
        .eq("id", existingRecord.id);

      if (error) {
        console.error("Failed to reactivate subscriber:", error);
        return { success: false, isNew: false, error: error.message };
      }

      return { success: true, isNew: false };
    }

    // Already subscribed
    return { success: true, isNew: false };
  }

  // Insert new subscriber
  const insertData: NewsletterSubscriberInsert = {
    email,
    subscribed: true,
    source,
    ip_address: ipAddress,
    user_agent: userAgent,
    unsubscribed_at: null,
  };

  const { error } = await client
    .from("newsletter_subscribers")
    .insert(insertData);

  if (error) {
    console.error("Failed to insert newsletter subscriber:", error);
    return { success: false, isNew: false, error: error.message };
  }

  return { success: true, isNew: true };
}

/**
 * Generate signed URLs for uploaded images
 * @param paths Array of storage paths
 * @param expiresIn Expiration time in seconds (default: 7 days)
 */
export async function generateSignedUrls(
  paths: string[],
  expiresIn: number = 7 * 24 * 60 * 60
): Promise<{ path: string; url: string | null }[]> {
  const client = getSupabaseAdmin();
  const results: { path: string; url: string | null }[] = [];

  for (const path of paths) {
    try {
      const { data, error } = await client.storage
        .from("quote-images")
        .createSignedUrl(path, expiresIn);

      if (error) {
        console.error(`Failed to generate signed URL for ${path}:`, error);
        results.push({ path, url: null });
      } else {
        results.push({ path, url: data.signedUrl });
      }
    } catch (error) {
      console.error(`Error generating signed URL for ${path}:`, error);
      results.push({ path, url: null });
    }
  }

  return results;
}

export async function insertPendingUpload(
  data: QuoteUploadInsert
): Promise<{ success: boolean; error?: string }> {
  const { error } = await getSupabaseAdmin()
    .from("quote_uploads")
    .insert({
      ...data,
      quote_id: null,
      attached_at: null,
      deleted_at: null,
    });

  if (error) {
    console.error("Failed to insert pending upload:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function attachPendingUploadsToQuote(
  quoteId: string,
  paths: string[],
  fingerprint: string
): Promise<{ success: boolean; attachedCount: number; error?: string }> {
  if (paths.length === 0) {
    return { success: true, attachedCount: 0 };
  }

  const now = new Date().toISOString();
  const { data, error } = await getSupabaseAdmin()
    .from("quote_uploads")
    .update({
      quote_id: quoteId,
      attached_at: now,
    })
    .in("path", paths)
    .eq("fingerprint", fingerprint)
    .is("quote_id", null)
    .is("deleted_at", null)
    .gt("expires_at", now)
    .select("path");

  if (error) {
    console.error("Failed to attach pending uploads:", error);
    return { success: false, attachedCount: 0, error: error.message };
  }

  return {
    success: true,
    attachedCount: Array.isArray(data) ? data.length : 0,
  };
}

export async function listExpiredPendingUploads(limit: number = 100): Promise<QuoteUploadRecord[]> {
  const now = new Date().toISOString();
  const { data, error } = await getSupabaseAdmin()
    .from("quote_uploads")
    .select("*")
    .is("quote_id", null)
    .is("deleted_at", null)
    .lt("expires_at", now)
    .order("expires_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Failed to list expired pending uploads:", error);
    return [];
  }

  return (data as QuoteUploadRecord[]) || [];
}

export async function markUploadsDeleted(paths: string[]): Promise<void> {
  if (paths.length === 0) return;

  const { error } = await getSupabaseAdmin()
    .from("quote_uploads")
    .update({ deleted_at: new Date().toISOString() })
    .in("path", paths);

  if (error) {
    console.error("Failed to mark uploads deleted:", error);
  }
}

export async function deleteStorageFiles(paths: string[]): Promise<{ success: boolean; error?: string }> {
  if (paths.length === 0) {
    return { success: true };
  }

  const { error } = await getSupabaseAdmin().storage
    .from("quote-images")
    .remove(paths);

  if (error) {
    console.error("Failed to delete storage files:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
