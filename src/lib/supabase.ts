import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate that credentials are provided
if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== "undefined") {
        console.error(
            "❌ Supabase credentials are missing!\n\n" +
            "Please create a .env.local file in the root directory with:\n\n" +
            "NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url\n" +
            "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n" +
            "You can find these values in your Supabase project settings."
        );
    }
}

// Only create client if credentials are available
// This prevents the placeholder URL from being used
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: typeof window !== "undefined",
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    })
    : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
    return !!supabaseUrl && !!supabaseAnonKey && supabase !== null;
};

