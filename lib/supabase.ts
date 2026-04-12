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

// Input types for inserts (without auto-generated fields)
export type QuoteInsert = Omit<QuoteRecord, "id" | "created_at">;
export type ContactInsert = Omit<ContactRecord, "id" | "created_at">;
export type NewsletterSubscriberInsert = Omit<NewsletterSubscriberRecord, "id" | "created_at">;

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
