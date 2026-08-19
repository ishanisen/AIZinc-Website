/**
 * One-off / re-runnable backfill: generate 384-dim embeddings for tools.embedding
 * using Xenova/all-MiniLM-L6-v2, so the directory can do semantic search.
 *
 * Usage:
 *   npm run embed
 *
 * Reads `.env.local` / `.env` the same way as scripts/backfill-logos.js.
 * Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and
 * SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY).
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { pipeline } = require("@xenova/transformers");

const ROOT = path.resolve(__dirname, "..");
const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

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

function describeShape(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

/**
 * PostgREST returns a nested relation as:
 *   - null  when there is no matching tool_details row
 *   - object when the FK is treated as 1:1
 *   - array when the reverse FK is treated as 1:n
 * Observed live: first row had tool_details === null (table currently empty).
 */
function extractToolDetails(nested) {
  if (!nested) return null;
  if (Array.isArray(nested)) return nested[0] ?? null;
  return nested;
}

function buildEmbeddingText(tool, details) {
  const parts = [
    tool.name,
    tool.tagline,
    details?.primary_capability,
    details?.specific_use_cases,
    details?.target_audience,
  ]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  return parts.join(". ");
}

async function main() {
  const supabaseUrl = (
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  )
    .trim()
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/$/, "");
  const serviceRoleKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    ""
  ).trim();

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "Missing env vars. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY).",
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: tools, error } = await supabase
    .from("tools")
    .select(
      "id, name, tagline, tool_details(primary_capability, specific_use_cases, target_audience)",
    )
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch tools: ${error.message}`);
  }

  const rows = tools ?? [];
  console.log(`Fetched ${rows.length} tool(s).\n`);

  // Confirm the nested join shape before looping — do not assume array vs object.
  if (rows[0]) {
    console.log("--- First row shape ---");
    console.log(JSON.stringify(rows[0], null, 2));
    console.log(
      `tool_details type: ${describeShape(rows[0].tool_details)}\n`,
    );
  }

  console.log(`Loading embedding model ${MODEL_ID} (once)...`);
  const extractor = await pipeline("feature-extraction", MODEL_ID);
  console.log("Model ready.\n");

  let succeeded = 0;
  let skipped = 0;
  let failed = 0;

  for (const tool of rows) {
    const label = tool.name?.trim() || `id ${tool.id}`;

    try {
      const details = extractToolDetails(tool.tool_details);
      const text = buildEmbeddingText(tool, details);

      if (!text) {
        skipped += 1;
        console.warn(`Skipped: ${label} (id: ${tool.id}) — no text to embed`);
        continue;
      }

      const output = await extractor(text, {
        pooling: "mean",
        normalize: true,
      });
      const embedding = Array.from(output.data);

      const { error: updateError } = await supabase
        .from("tools")
        .update({ embedding })
        .eq("id", tool.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      succeeded += 1;
      console.log(`Embedded: ${label} (id: ${tool.id})`);
    } catch (err) {
      failed += 1;
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Failed: ${label} (id: ${tool.id}) — ${message}`);
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
