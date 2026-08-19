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
  slug: string;
};

export type CategoryTopTool = {
  id: string;
  name: string;
  slug: string;
  websiteUrl?: string;
  logoUrl?: string;
};

export type CategoryOverview = CategoryRecord & {
  toolCount: number;
  topTools: CategoryTopTool[];
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

/** Nested tool_details fields — null means missing, never a guessed value. */
export type ToolDetails = {
  primaryCapability: string | null;
  specificUseCases: string | null;
  targetAudience: string | null;
  deploymentType: string | null;
  underlyingModelApi: string | null;
  apiAvailability: string | null;
  openSourceStatus: string | null;
  dataStoragePolicy: string | null;
  complianceCertifications: string | null;
  commercialUseRights: string | null;
  developerParent: string | null;
  countryOfOrigin: string | null;
  integrationEcosystem: string | null;
  trialLimitations: string | null;
};

export type ToolDetail = Tool & {
  hasFreePlan: boolean;
  pricingLabel: string | null;
  details: ToolDetails | null;
};

export const CATEGORY_PAGE_SIZE = 12;
