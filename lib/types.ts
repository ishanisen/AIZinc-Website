export type Tool = {
  id: string;
  name: string;
  slug: string;
  category: string;
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
