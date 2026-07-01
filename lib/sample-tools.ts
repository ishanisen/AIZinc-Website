import { Tool } from "./types";

export const sampleTools: Tool[] = [
  {
    id: "1",
    name: "Claude",
    slug: "claude",
    category: "Writing",
    description:
      "Advanced AI assistant for writing, analysis, and complex reasoning tasks.",
    pricing: "Freemium",
    tags: ["Chat", "Writing", "Analysis"],
    featured: true,
    platform: "Web",
    websiteUrl: "https://claude.ai",
  },
  {
    id: "2",
    name: "Cursor",
    slug: "cursor",
    category: "Coding",
    description:
      "AI-powered code editor that understands your codebase and accelerates development.",
    pricing: "Freemium",
    tags: ["IDE", "Autocomplete", "Agents"],
    featured: true,
    platform: "Desktop",
    websiteUrl: "https://cursor.com",
  },
  {
    id: "3",
    name: "Midjourney",
    slug: "midjourney",
    category: "Design",
    description:
      "Generate stunning images and visual concepts from natural language prompts.",
    pricing: "Paid",
    tags: ["Image", "Creative", "Art"],
    featured: true,
    platform: "Web",
    websiteUrl: "https://midjourney.com",
  },
  {
    id: "4",
    name: "Notion AI",
    slug: "notion-ai",
    category: "Productivity",
    description:
      "Built-in AI for drafting, summarizing, and organizing notes inside Notion.",
    pricing: "Freemium",
    tags: ["Notes", "Docs", "Workspace"],
    featured: false,
    platform: "Web",
    websiteUrl: "https://notion.so",
  },
  {
    id: "5",
    name: "Runway",
    slug: "runway",
    category: "Video",
    description:
      "Create and edit videos with generative AI tools for creators and teams.",
    pricing: "Freemium",
    tags: ["Video", "Editing", "Gen-2"],
    featured: false,
    platform: "Web",
    websiteUrl: "https://runwayml.com",
  },
  {
    id: "6",
    name: "Perplexity",
    slug: "perplexity",
    category: "Research",
    description:
      "AI search engine that delivers cited answers with real-time web sources.",
    pricing: "Freemium",
    tags: ["Search", "Citations", "Research"],
    featured: false,
    platform: "Web",
    websiteUrl: "https://perplexity.ai",
  },
  {
    id: "7",
    name: "Jasper",
    slug: "jasper",
    category: "Marketing",
    description:
      "AI copywriting platform built for marketing teams and brand campaigns.",
    pricing: "Paid",
    tags: ["Copy", "SEO", "Brand"],
    featured: false,
    platform: "Web",
    websiteUrl: "https://jasper.ai",
  },
  {
    id: "8",
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "Coding",
    description:
      "AI pair programmer that suggests code completions across your favorite IDE.",
    pricing: "Paid",
    tags: ["Autocomplete", "GitHub", "IDE"],
    featured: false,
    platform: "Extension",
    websiteUrl: "https://github.com/features/copilot",
  },
  {
    id: "9",
    name: "Figma AI",
    slug: "figma-ai",
    category: "Design",
    description:
      "Generate layouts, rename layers, and explore design variations in Figma.",
    pricing: "Freemium",
    tags: ["UI", "Prototyping", "Collaboration"],
    featured: false,
    platform: "Web",
    websiteUrl: "https://figma.com",
  },
  {
    id: "10",
    name: "Descript",
    slug: "descript",
    category: "Video",
    description:
      "Edit video and audio by editing text — powered by AI transcription.",
    pricing: "Freemium",
    tags: ["Podcast", "Transcription", "Editing"],
    featured: false,
    platform: "Desktop",
    websiteUrl: "https://descript.com",
  },
  {
    id: "11",
    name: "Grammarly",
    slug: "grammarly",
    category: "Writing",
    description:
      "Real-time writing assistant for grammar, tone, and clarity improvements.",
    pricing: "Freemium",
    tags: ["Grammar", "Tone", "Browser"],
    featured: false,
    platform: "Extension",
    websiteUrl: "https://grammarly.com",
  },
  {
    id: "12",
    name: "Otter.ai",
    slug: "otter-ai",
    category: "Productivity",
    description:
      "AI meeting assistant that transcribes, summarizes, and captures action items.",
    pricing: "Freemium",
    tags: ["Meetings", "Transcription", "Notes"],
    featured: false,
    platform: "Web",
    websiteUrl: "https://otter.ai",
  },
];

export function getFeaturedTools(tools: Tool[]): Tool[] {
  return tools.filter((tool) => tool.featured);
}
