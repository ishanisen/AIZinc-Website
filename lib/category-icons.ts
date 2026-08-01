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
