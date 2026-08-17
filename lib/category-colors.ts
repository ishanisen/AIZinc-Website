const HUE_BY_SLUG: Record<string, number> = {
  writing: 25,
  "image-generation": 320,
  "code-development": 285,
  "agents-automation": 195,
  "video-generation": 15,
  "productivity-note-taking": 145,
  "marketing-seo": 60,
  "design-ux": 340,
  "research-search": 245,
  "3d-animation": 300,
  "audio-music": 175,
  "data-analytics": 220,
  "education-learning": 120,
  "finance-accounting": 90,
  "hr-recruiting": 35,
  legal: 265,
  "meeting-transcription": 160,
  "sales-crm": 45,
  "customer-support": 205,
};

const HUE_BY_LABEL: Record<string, number> = {
  writing: 25,
  "image gen": 320,
  coding: 285,
  agents: 195,
  video: 15,
  productivity: 145,
  marketing: 60,
  design: 340,
  research: 245,
  "3d & animation": 300,
  "audio & music": 175,
  "data & analytics": 220,
  education: 120,
  finance: 90,
  hr: 35,
  legal: 265,
  meetings: 160,
  "sales & crm": 45,
  support: 205,
};

const FALLBACK_HUE = 262;

export const HERO_CATEGORY_SLUGS = [
  "writing",
  "image-generation",
  "code-development",
  "agents-automation",
  "video-generation",
  "productivity-note-taking",
  "marketing-seo",
  "design-ux",
  "research-search",
] as const;

export type CategoryPalette = {
  hue: number;
  fill: string;
  text: string;
  dot: string;
};

export function hueForCategory(slugOrLabel: string): number {
  const key = slugOrLabel.trim().toLowerCase();
  return HUE_BY_SLUG[key] ?? HUE_BY_LABEL[key] ?? FALLBACK_HUE;
}

export function categoryPalette(slugOrLabel: string): CategoryPalette {
  const hue = hueForCategory(slugOrLabel);
  return {
    hue,
    fill: `oklch(93% 0.045 ${hue})`,
    text: `oklch(34% 0.1 ${hue})`,
    dot: `oklch(55% 0.14 ${hue})`,
  };
}
