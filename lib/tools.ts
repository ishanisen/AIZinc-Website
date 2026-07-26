import { createSupabaseClient, getSupabaseEnvError } from "./supabase";
import { PRICING_OPTIONS, PricingOption, Tool } from "./types";

type SupabaseCategoryRow = {
  id: string | number;
  name: string;
  display_label: string | null;
};

type SupabaseToolRow = {
  id: string | number;
  name: string;
  slug: string;
  tagline: string | null;
  website_url: string | null;
  logo_url: string | null;
  pricing_model: string | null;
  primary_category_id: string | number | null;
  categories: SupabaseCategoryRow | SupabaseCategoryRow[] | null;
};

const DEFAULT_CATEGORY = "General";

function normalizeDisplayText(value: string | null | undefined): string {
  if (!value) return "";

  return value
    .replace(/\uFFFD/g, "\u2014")
    .replace(/\u0097/g, "\u2014")
    .replace(/â€"/g, "\u2014")
    .replace(/â€™/g, "\u2019")
    .trim();
}

function extractCategoryRow(
  categories: SupabaseCategoryRow | SupabaseCategoryRow[] | null | undefined,
): SupabaseCategoryRow | null {
  if (!categories) return null;
  return Array.isArray(categories) ? (categories[0] ?? null) : categories;
}

function extractCategoryDisplayLabel(
  categories: SupabaseCategoryRow | SupabaseCategoryRow[] | null | undefined,
): string {
  const category = extractCategoryRow(categories);
  if (!category) return DEFAULT_CATEGORY;

  return category.display_label?.trim() || category.name?.trim() || DEFAULT_CATEGORY;
}

function normalizePricing(value: string | null | undefined): PricingOption {
  const trimmed = value?.trim();
  if (!trimmed) return "Freemium";

  if (PRICING_OPTIONS.includes(trimmed as PricingOption)) {
    return trimmed as PricingOption;
  }

  return "Freemium";
}

function mapSupabaseToolToTool(row: SupabaseToolRow): Tool {
  const categoryRow = extractCategoryRow(row.categories);

  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    primaryCategoryId: row.primary_category_id
      ? String(row.primary_category_id)
      : categoryRow
        ? String(categoryRow.id)
        : null,
    category: extractCategoryDisplayLabel(row.categories),
    description: normalizeDisplayText(row.tagline),
    pricing: normalizePricing(row.pricing_model),
    tags: [],
    featured: false,
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
    .select(
      `
      id,
      name,
      slug,
      tagline,
      website_url,
      logo_url,
      pricing_model,
      primary_category_id,
      categories (
        id,
        name,
        display_label
      )
    `,
    )
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
