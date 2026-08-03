import {
  AudioLines,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Code2,
  GraduationCap,
  Headphones,
  Image as ImageIcon,
  type LucideIcon,
  Megaphone,
  MessageSquareText,
  Box,
  PenLine,
  Scale,
  Search,
  Sparkles,
  Users,
  Video,
  Wallet,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  writing: PenLine,
  "image-generation": ImageIcon,
  "video-generation": Video,
  "audio-music": AudioLines,
  "code-development": Code2,
  "productivity-note-taking": BookOpen,
  "meeting-transcription": Headphones,
  "research-search": Search,
  "data-analytics": BarChart3,
  "customer-support": MessageSquareText,
  "marketing-seo": Megaphone,
  "sales-crm": Briefcase,
  "hr-recruiting": Users,
  "finance-accounting": Wallet,
  legal: Scale,
  "design-ux": Sparkles,
  "education-learning": GraduationCap,
  "3d-animation": Box,
  "agents-automation": Bot,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Sparkles;
}

/** Soft teal/cream tints for icon wells — cycles by slug for grid rhythm. */
const CATEGORY_ICON_TINTS = [
  "border-accent/20 bg-[#E8F2F2] text-accent shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7)]",
  "border-[#E0D8CC] bg-[#F3EDE4] text-[#3D6B6B] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.65)]",
  "border-accent/15 bg-[#DCEBEB] text-accent-hover shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7)]",
  "border-[#E4DDD2] bg-[#F0EBE3] text-[#2D6A6A] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.65)]",
  "border-accent/25 bg-[#E2F0F0] text-accent shadow-[inset_0_1px_0_rgb(255_255_255_/_0.75)]",
  "border-[#DDD5C8] bg-[#EDE6DC] text-[#245656] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.6)]",
] as const;

export function getCategoryIconTint(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % CATEGORY_ICON_TINTS.length;
  }
  return CATEGORY_ICON_TINTS[hash] ?? CATEGORY_ICON_TINTS[0];
}
