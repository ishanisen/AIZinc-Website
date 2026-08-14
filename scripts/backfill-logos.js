/**
 * One-time backfill: set tools.logo_url from the Google Favicon API.
 *
 * NOTE: Google Favicon API images are small (typically 16–256px via `sz=`).
 * If you want higher-res logos later, swap `buildLogoUrl()` for Logo.dev
 * or Brandfetch — the rest of this script can stay the same.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run backfill-logos
 *
 * Also reads `.env.local` / `.env` if present. Falls back to
 * NEXT_PUBLIC_SUPABASE_URL when SUPABASE_URL is unset.
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const DELAY_MS = 100;
const ROOT = path.resolve(__dirname, "..");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(ROOT, ".env.local"));
loadEnvFile(path.join(ROOT, ".env"));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Swap this function later for Logo.dev / Brandfetch if you need higher-res logos.
 * Google Favicon API typically returns 16–256px icons.
 */
function buildLogoUrl(domain) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

function extractDomain(website) {
  if (!website || typeof website !== "string") return null;

  const trimmed = website.trim();
  if (!trimmed) return null;

  try {
    const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const hostname = new URL(withProtocol).hostname.toLowerCase();
    return hostname.replace(/^www\./, "") || null;
  } catch {
    const stripped = trimmed
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .split(/[/?#]/)[0]
      .trim()
      .toLowerCase();
    return stripped || null;
  }
}

async function main() {
  const supabaseUrl = (
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  )
    .trim()
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/$/, "");
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "Missing env vars. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.",
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: tools, error } = await supabase
    .from("tools")
    .select("id, name, website_url, logo_url")
    .is("logo_url", null);

  if (error) {
    throw new Error(`Failed to fetch tools: ${error.message}`);
  }

  const rows = tools ?? [];
  console.log(`Found ${rows.length} tool(s) with null logo_url.\n`);

  let succeeded = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < rows.length; i += 1) {
    const tool = rows[i];
    const label = tool.name?.trim() || `id ${tool.id}`;

    try {
      const domain = extractDomain(tool.website_url);
      if (!domain) {
        skipped += 1;
        console.warn(
          `[${i + 1}/${rows.length}] Skipped ${label} — no usable website_url (${tool.website_url ?? "null"})`,
        );
        continue;
      }

      const logoUrl = buildLogoUrl(domain);
      const { error: updateError } = await supabase
        .from("tools")
        .update({ logo_url: logoUrl })
        .eq("id", tool.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      succeeded += 1;
      console.log(`Updated ${label} -> ${logoUrl}`);
    } catch (err) {
      failed += 1;
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[${i + 1}/${rows.length}] Failed ${label}: ${message}`);
    }

    if (i < rows.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Total processed: ${rows.length}`);
  console.log(`Succeeded:       ${succeeded}`);
  console.log(`Skipped:         ${skipped}`);
  console.log(`Failed:          ${failed}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
