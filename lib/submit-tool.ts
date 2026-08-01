export type SubmitPricingOption =
  | "Free"
  | "Freemium"
  | "Paid"
  | "Free Trial"
  | "Open Source";

export const SUBMIT_PRICING_OPTIONS: SubmitPricingOption[] = [
  "Free",
  "Freemium",
  "Paid",
  "Free Trial",
  "Open Source",
];

export type RelationshipOption =
  | "I'm the founder/maker"
  | "I use this tool"
  | "Other";

export const RELATIONSHIP_OPTIONS: RelationshipOption[] = [
  "I'm the founder/maker",
  "I use this tool",
  "Other",
];

export type SubmitToolPayload = {
  toolName: string;
  websiteUrl: string;
  tagline: string;
  shortDescription: string;
  categoryId: string;
  pricingModel: SubmitPricingOption;
  submitterName: string;
  submitterEmail: string;
  isAiPowered: boolean;
  tags: string[];
  keyFeatures: string[];
  differentiator: string;
  relationship: RelationshipOption | "";
  logo: { name: string; size: number; type: string } | null;
  screenshot: { name: string; size: number; type: string } | null;
};

/**
 * Placeholder submit handler — mirrors POST /api/submit-tool.
 * Static export does not support API routes; replace with a real endpoint later.
 */
export async function submitTool(payload: SubmitToolPayload): Promise<void> {
  console.log("[POST /api/submit-tool]", payload);

  await new Promise((resolve) => setTimeout(resolve, 900));
}
