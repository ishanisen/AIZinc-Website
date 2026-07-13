import { Tool, normalizeCategoryName } from "./types";

const TOOLS_API_URL =
  "https://mediumaquamarine-porpoise-781369.hostingersite.com/wp-json/wp/v2/tools?per_page=100";

const MEDIA_API_URL =
  "https://mediumaquamarine-porpoise-781369.hostingersite.com/wp-json/wp/v2/media";

type WordPressToolCategory = {
  name: string;
  slug: string;
};

type WordPressToolAcf = {
  description?: string;
  pricing?: string;
  platform?: string;
  website_url?: string;
  logo_url?: string | number | false;
  featured?: boolean;
};

type WordPressTool = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: WordPressToolAcf;
  class_list?: string[];
  _embedded?: {
    "wp:term"?: WordPressToolCategory[][];
  };
};

type WordPressMedia = {
  id: number;
  source_url: string;
};

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function normalizePricing(value: string | undefined): Tool["pricing"] {
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

function slugToCategoryName(slug: string): string {
  const label = slug.charAt(0).toUpperCase() + slug.slice(1);
  return String(normalizeCategoryName(label));
}

function getCategoryNames(tool: WordPressTool): string[] {
  const names = new Set<string>();

  for (const term of tool._embedded?.["wp:term"]?.flat() ?? []) {
    if (term?.name) {
      names.add(String(normalizeCategoryName(term.name)));
    }
  }

  for (const item of tool.class_list ?? []) {
    if (!item.startsWith("tool-category-")) continue;
    const slug = item.replace("tool-category-", "");
    names.add(slugToCategoryName(slug));
  }

  return Array.from(names);
}

async function fetchLogoUrls(
  logoIds: number[],
): Promise<Map<number, string>> {
  if (logoIds.length === 0) return new Map();

  try {
    const uniqueIds = [...new Set(logoIds)];
    const response = await fetch(
      `${MEDIA_API_URL}?include=${uniqueIds.join(",")}&per_page=${uniqueIds.length}`,
    );

    if (!response.ok) {
      console.warn(
        "[fetchLogoUrls] failed:",
        response.status,
        response.statusText,
      );
      return new Map();
    }

    const media = (await response.json()) as WordPressMedia[];
    return new Map(media.map((item) => [item.id, item.source_url]));
  } catch (error) {
    console.warn("[fetchLogoUrls] error:", error);
    return new Map();
  }
}

function resolveLogoUrl(
  logoUrl: WordPressToolAcf["logo_url"],
  logoMap: Map<number, string>,
): string | undefined {
  if (!logoUrl) return undefined;
  if (typeof logoUrl === "string") return logoUrl;
  if (typeof logoUrl === "number") return logoMap.get(logoUrl);
  return undefined;
}

export function mapWordPressToolToTool(
  tool: WordPressTool,
  logoMap: Map<number, string>,
): Tool {
  const categories = getCategoryNames(tool);
  const primaryCategory = categories[0] ?? "Uncategorized";

  return {
    id: String(tool.id),
    name: stripHtml(tool.title.rendered),
    slug: tool.slug,
    category: primaryCategory,
    categories,
    description: tool.acf?.description?.trim() ?? "",
    pricing: normalizePricing(tool.acf?.pricing),
    tags: categories.length > 0 ? categories : [primaryCategory],
    featured: Boolean(tool.acf?.featured),
    platform: tool.acf?.platform?.trim() ?? "Web",
    logoUrl: resolveLogoUrl(tool.acf?.logo_url, logoMap),
    websiteUrl: tool.acf?.website_url?.trim() || undefined,
  };
}

export async function fetchTools(): Promise<Tool[]> {
  const response = await fetch(TOOLS_API_URL);

  console.log("[fetchTools] response status:", response.status);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tools: ${response.status} ${response.statusText}`,
    );
  }

  const wordpressTools = (await response.json()) as WordPressTool[];

  const logoIds = wordpressTools
    .map((tool) => tool.acf?.logo_url)
    .filter((value): value is number => typeof value === "number");

  let logoMap = new Map<number, string>();

  try {
    logoMap = await fetchLogoUrls(logoIds);
  } catch (error) {
    console.warn("[fetchTools] logo fetch failed, continuing without logos:", error);
  }

  return wordpressTools.map((tool) => mapWordPressToolToTool(tool, logoMap));
}

export function getFeaturedTools(tools: Tool[]): Tool[] {
  return tools.filter((tool) => tool.featured);
}
