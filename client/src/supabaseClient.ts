import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and anon key are required");
  }
} catch (error) {
  console.error("Error creating Supabase client:", error);
  throw error;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
