import { createClient } from "@supabase/supabase-js";

// Anonymous server-side client for public reads (uses anon/publishable key,
// RLS applies). Cached per request via Next.js fetch dedup.
export function getPublicSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
