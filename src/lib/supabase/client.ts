import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../database.types";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  if (!url || !key) {
    console.error("Supabase client error: URL or Key is missing", { url: !!url, key: !!key });
  }

  return createBrowserClient<Database>(
    url!,
    key!
  );
}
