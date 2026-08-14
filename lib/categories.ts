import { createServerSupabaseClient, getSupabaseEnvError } from "./supabase";
import {
  CategoryOverview,
  CategoryRecord,
  CategoryTopTool,
} from "./types";

type SupabaseCategoryRow = {
  id: string | number;
  name: string;
  display_label: string | null;
  slug: string;
};

type SupabaseToolAggregateRow = {
  id: string | number;
  name: string;
  slug: string;
  website_url: string | null;
  logo_url: string | null;
  featured: boolean | null;
  primary_category_id: string | number | null;
};

function mapCategoryRow(row: SupabaseCategoryRow): CategoryRecord {
  const name = row.name.trim();
  return {
    id: String(row.id),
    name,
    displayLabel: row.display_label?.trim() || name,
    slug: row.slug.trim(),
  };
}

export async function fetchCategories(): Promise<CategoryRecord[]> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, display_label, slug")
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row: SupabaseCategoryRow) => mapCategoryRow(row));
}

export async function fetchCategoryBySlug(
  slug: string,
): Promise<CategoryRecord | null> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, display_label, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  return mapCategoryRow(data as SupabaseCategoryRow);
}

/**
 * One categories query + one tools query, then aggregate counts / top tools
 * in memory (avoids N+1 per category).
 */
export async function fetchCategoryOverviews(): Promise<CategoryOverview[]> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const supabase = createServerSupabaseClient();

  const [categoriesResult, toolsResult] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, display_label, slug")
      .order("name"),
    supabase
      .from("tools")
      .select(
        "id, name, slug, website_url, logo_url, featured, primary_category_id",
      )
      .eq("published", true)
      .order("name"),
  ]);

  if (categoriesResult.error) {
    throw new Error(categoriesResult.error.message);
  }

  if (toolsResult.error) {
    throw new Error(toolsResult.error.message);
  }

  const toolsByCategory = new Map<string, SupabaseToolAggregateRow[]>();

  for (const row of (toolsResult.data ?? []) as SupabaseToolAggregateRow[]) {
    if (row.primary_category_id == null) continue;
    const key = String(row.primary_category_id);
    const list = toolsByCategory.get(key) ?? [];
    list.push(row);
    toolsByCategory.set(key, list);
  }

  const overviews: CategoryOverview[] = [];

  for (const row of (categoriesResult.data ?? []) as SupabaseCategoryRow[]) {
    const category = mapCategoryRow(row);
    const tools = toolsByCategory.get(category.id) ?? [];
    if (tools.length === 0) continue;

    const sorted = [...tools].sort((a, b) => {
      const featuredDiff =
        Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDiff !== 0) return featuredDiff;
      return a.name.localeCompare(b.name);
    });

    const topTools: CategoryTopTool[] = sorted.slice(0, 5).map((tool) => ({
      id: String(tool.id),
      name: tool.name.trim(),
      slug: tool.slug,
      websiteUrl: tool.website_url?.trim() || undefined,
      logoUrl: tool.logo_url?.trim() || undefined,
    }));

    overviews.push({
      ...category,
      toolCount: tools.length,
      topTools,
    });
  }

  return overviews;
}
