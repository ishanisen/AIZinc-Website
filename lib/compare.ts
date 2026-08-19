export const COMPARE_PARAM = "compare";
export const MAX_COMPARE = 4;

export function parseCompareParam(value: string | null | undefined): string[] {
  if (!value) return [];

  const seen = new Set<string>();
  const slugs: string[] = [];

  for (const part of value.split(",")) {
    const slug = part.trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    slugs.push(slug);
    if (slugs.length >= MAX_COMPARE) break;
  }

  return slugs;
}

export function serializeCompareParam(slugs: string[]): string {
  return parseCompareParam(slugs.join(",")).join(",");
}

export function compareHref(slugs: string[]): string {
  const value = serializeCompareParam(slugs);
  return value ? `/compare?${COMPARE_PARAM}=${encodeURIComponent(value)}` : "/compare";
}

export function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
