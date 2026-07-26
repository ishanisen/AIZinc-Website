import { createClient, SupabaseClient } from "@supabase/supabase-js";

function isPlaceholderValue(value: string): boolean {
  return (
    value.includes("YOUR_PROJECT_REF") ||
    value.includes("your_key_here") ||
    value.includes("your-project-url") ||
    value.includes("your-publishable-key")
  );
}

function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

export function getSupabaseEnvError(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !key) {
    return "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.";
  }

  if (isPlaceholderValue(url) || isPlaceholderValue(key)) {
    return "Supabase is not configured yet. Replace the placeholder values in .env.local with your real project URL and publishable key.";
  }

  if (url.includes("/rest/v1")) {
    return "Use the base Supabase project URL (https://your-ref.supabase.co), not the /rest/v1 URL.";
  }

  return null;
}

export function createSupabaseClient(): SupabaseClient {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL!);
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  return createClient(url, key);
}
