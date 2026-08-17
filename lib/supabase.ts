import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function isPlaceholderValue(value: string): boolean {
  return (
    value.includes("YOUR_PROJECT_REF") ||
    value.includes("your-project-ref") ||
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
    return "Supabase is not configured — check environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.";
  }

  if (isPlaceholderValue(url) || isPlaceholderValue(key)) {
    return "Supabase is not configured yet. Replace the placeholder values with your real project URL and publishable key.";
  }

  if (url.includes("/rest/v1")) {
    return "Use the base Supabase project URL (https://your-ref.supabase.co), not the /rest/v1 URL.";
  }

  return null;
}

export function isSupabaseConfigError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.message.includes("Supabase is not configured") ||
    error.message.includes("NEXT_PUBLIC_SUPABASE_URL") ||
    error.message.includes("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
  );
}

function getSupabaseCredentials(): { url: string; key: string } {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  return {
    url: normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL!),
    key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  };
}

/**
 * Server Components, Route Handlers, and Server Actions.
 * Uses no-store so directory data stays fresh on each request.
 */
export function createServerSupabaseClient(): SupabaseClient {
  const { url, key } = getSupabaseCredentials();

  return createClient(url, key, {
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          cache: "no-store",
        }),
    },
  });
}

/**
 * Client Components only (browser). Prefer server fetching for page data.
 */
export function createBrowserSupabaseClient(): SupabaseClient {
  const { url, key } = getSupabaseCredentials();
  return createClient(url, key);
}

/** @deprecated Use createServerSupabaseClient or createBrowserSupabaseClient */
export function createSupabaseClient(): SupabaseClient {
  return createServerSupabaseClient();
}
