import { createSupabaseClient, getSupabaseEnvError } from "./supabase";
import { Tool } from "./types";

type SupabaseToolRow = {
  id: string | number;
  name: string;
  slug: string;
  tagline: string | null;
  website_url: string | null;
  logo_url: string | null;
  pricing_model: string | null;
};

function normalizePricing(value: string | undefined | null): Tool["pricing"] {
  if (!value) return "Freemium";

  const label = value.includes(": ")
    ? value.split(": ").pop()!.trim()
    : value.trim();

  const lower = label.toLowerCase();
  if (lower === "free") return "Free";
  if (lower === "paid") return "Paid";
  if (lower === "freemium") return "Freemium";

  return "Freemium";
}

function mapSupabaseToolToTool(row: SupabaseToolRow): Tool {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    category: "Uncategorized",
    categories: [],
    description: row.tagline?.trim() ?? "",
    pricing: normalizePricing(row.pricing_model),
    tags: [],
    featured: false,
    platform: "Web",
    logoUrl: row.logo_url?.trim() || undefined,
    websiteUrl: row.website_url?.trim() || undefined,
  };
}

export async function fetchTools(): Promise<Tool[]> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("tools")
    .select("id, name, slug, tagline, website_url, logo_url, pricing_model")
    .eq("published", true)
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapSupabaseToolToTool);
}

export function getFeaturedTools(tools: Tool[]): Tool[] {
  return tools.filter((tool) => tool.featured);
}
