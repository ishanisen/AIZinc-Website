export type Tool = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categories: string[];
  description: string;
  pricing: "Free" | "Freemium" | "Paid";
  tags: string[];
  featured: boolean;
  platform: string;
  logoUrl?: string;
  websiteUrl?: string;
};

export type Category =
  | "Writing"
  | "Coding"
  | "Design"
  | "Video"
  | "Productivity"
  | "Marketing"
  | "Research";

export const CATEGORIES: Category[] = [
  "Writing",
  "Coding",
  "Design",
  "Video",
  "Productivity",
  "Marketing",
  "Research",
];

export function normalizeCategoryName(name: string): Category | string {
  const match = CATEGORIES.find(
    (category) => category.toLowerCase() === name.toLowerCase(),
  );
  return match ?? name;
}
