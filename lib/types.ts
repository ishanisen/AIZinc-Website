export type PricingOption = "Free" | "Freemium" | "Free Trial" | "Paid";

export const PRICING_OPTIONS: PricingOption[] = [
  "Free",
  "Freemium",
  "Free Trial",
  "Paid",
];

export type CategoryRecord = {
  id: string;
  name: string;
  displayLabel: string;
};

export type Tool = {
  id: string;
  name: string;
  slug: string;
  primaryCategoryId: string | null;
  category: string;
  description: string;
  pricing: PricingOption;
  tags: string[];
  featured: boolean;
  logoUrl?: string;
  websiteUrl?: string;
};
