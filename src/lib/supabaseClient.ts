import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Read envs safely. If missing, we export `null` so UI can degrade gracefully.
const url = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const anon = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient | null =
  url && anon ? createClient(url, anon, { auth: { persistSession: false } }) : null;
