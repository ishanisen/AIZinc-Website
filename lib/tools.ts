import { createServerSupabaseClient, getSupabaseEnvError } from "./supabase";
import { fetchCategoryBySlug } from "./categories";
import {
  CATEGORY_PAGE_SIZE,
  CategoryRecord,
  PRICING_OPTIONS,
  PricingOption,
  Tool,
  ToolDetail,
  ToolDetails,
} from "./types";

type SupabaseCategoryRow = {
  id: string | number;
  name: string;
  display_label: string | null;
  slug?: string | null;
};

type SupabaseToolDetailsRow = {
  primary_capability: string | null;
  specific_use_cases: string | null;
  target_audience: string | null;
  deployment_type: string | null;
  underlying_model_api: string | null;
  api_availability: string | null;
  open_source_status: string | null;
  data_storage_policy: string | null;
  compliance_certifications: string | null;
  commercial_use_rights: string | null;
  developer_parent: string | null;
  country_of_origin: string | null;
  integration_ecosystem: string | null;
  trial_limitations: string | null;
};

type SupabaseToolRow = {
  id: string | number;
  name: string;
  slug: string;
  tagline: string | null;
  website_url: string | null;
  logo_url: string | null;
  pricing_model: string | null;
  featured: boolean | null;
  has_free_plan?: boolean | null;
  primary_category_id: string | number | null;
  categories: SupabaseCategoryRow | SupabaseCategoryRow[] | null;
  tool_details?:
    | SupabaseToolDetailsRow
    | SupabaseToolDetailsRow[]
    | null;
};

export type CategoryToolsPage = {
  category: CategoryRecord;
  tools: Tool[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
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

function extractNestedRow<T>(
  nested: T | T[] | null | undefined,
): T | null {
  if (!nested) return null;
  return Array.isArray(nested) ? (nested[0] ?? null) : nested;
}

function extractCategoryRow(
  categories: SupabaseCategoryRow | SupabaseCategoryRow[] | null | undefined,
): SupabaseCategoryRow | null {
  return extractNestedRow(categories);
}

function nullableDisplayText(value: string | null | undefined): string | null {
  const normalized = normalizeDisplayText(value);
  return normalized || null;
}

function mapToolDetails(
  nested:
    | SupabaseToolDetailsRow
    | SupabaseToolDetailsRow[]
    | null
    | undefined,
): ToolDetails | null {
  const row = extractNestedRow(nested);
  if (!row) return null;

  return {
    primaryCapability: nullableDisplayText(row.primary_capability),
    specificUseCases: nullableDisplayText(row.specific_use_cases),
    targetAudience: nullableDisplayText(row.target_audience),
    deploymentType: nullableDisplayText(row.deployment_type),
    underlyingModelApi: nullableDisplayText(row.underlying_model_api),
    apiAvailability: nullableDisplayText(row.api_availability),
    openSourceStatus: nullableDisplayText(row.open_source_status),
    dataStoragePolicy: nullableDisplayText(row.data_storage_policy),
    complianceCertifications: nullableDisplayText(
      row.compliance_certifications,
    ),
    commercialUseRights: nullableDisplayText(row.commercial_use_rights),
    developerParent: nullableDisplayText(row.developer_parent),
    countryOfOrigin: nullableDisplayText(row.country_of_origin),
    integrationEcosystem: nullableDisplayText(row.integration_ecosystem),
    trialLimitations: nullableDisplayText(row.trial_limitations),
  };
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
    featured: Boolean(row.featured),
    logoUrl: row.logo_url?.trim() || undefined,
    websiteUrl: row.website_url?.trim() || undefined,
  };
}

function mapSupabaseToolToToolDetail(row: SupabaseToolRow): ToolDetail {
  return {
    ...mapSupabaseToolToTool(row),
    hasFreePlan: Boolean(row.has_free_plan),
    pricingLabel: row.pricing_model?.trim() || null,
    details: mapToolDetails(row.tool_details),
  };
}

const TOOL_SELECT = `
  id,
  name,
  slug,
  tagline,
  website_url,
  logo_url,
  pricing_model,
  featured,
  primary_category_id,
  categories (
    id,
    name,
    display_label,
    slug
  )
`;

export async function fetchTools(): Promise<Tool[]> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tools")
    .select(TOOL_SELECT)
    .eq("published", true)
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapSupabaseToolToTool(row as SupabaseToolRow));
}

export async function fetchToolsByCategorySlug(
  slug: string,
  page = 1,
  pageSize: number = CATEGORY_PAGE_SIZE,
): Promise<CategoryToolsPage | null> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const category = await fetchCategoryBySlug(slug);
  if (!category) return null;

  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  const supabase = createServerSupabaseClient();

  const { data, error, count } = await supabase
    .from("tools")
    .select(TOOL_SELECT, { count: "exact" })
    .eq("published", true)
    .eq("primary_category_id", category.id)
    .order("featured", { ascending: false })
    .order("name")
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));

  return {
    category,
    tools: (data ?? []).map((row) =>
      mapSupabaseToolToTool(row as SupabaseToolRow),
    ),
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
  };
}

const TOOL_DETAIL_SELECT = `
  id,
  name,
  slug,
  tagline,
  website_url,
  logo_url,
  pricing_model,
  has_free_plan,
  featured,
  published,
  primary_category_id,
  categories (
    id,
    name,
    display_label,
    slug
  ),
  tool_details (
    primary_capability,
    specific_use_cases,
    target_audience,
    deployment_type,
    underlying_model_api,
    api_availability,
    open_source_status,
    data_storage_policy,
    compliance_certifications,
    commercial_use_rights,
    developer_parent,
    country_of_origin,
    integration_ecosystem,
    trial_limitations
  )
`;

export async function fetchToolBySlug(
  slug: string,
): Promise<ToolDetail | null> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tools")
    .select(TOOL_DETAIL_SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  return mapSupabaseToolToToolDetail(data as SupabaseToolRow);
}

export async function fetchToolsBySlugs(
  slugs: string[],
): Promise<ToolDetail[]> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const unique = [...new Set(slugs.map((slug) => slug.trim()).filter(Boolean))];
  if (unique.length === 0) return [];

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tools")
    .select(TOOL_DETAIL_SELECT)
    .eq("published", true)
    .in("slug", unique);

  if (error) {
    throw new Error(error.message);
  }

  const bySlug = new Map(
    (data ?? []).map((row) => {
      const tool = mapSupabaseToolToToolDetail(row as SupabaseToolRow);
      return [tool.slug, tool] as const;
    }),
  );

  return unique
    .map((slug) => bySlug.get(slug))
    .filter((tool): tool is ToolDetail => Boolean(tool));
}
