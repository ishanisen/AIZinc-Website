import HomePage from "@/components/home-page";
import { fetchTools } from "@/lib/tools";
import { Tool } from "@/lib/types";

export default async function Page() {
  let tools: Tool[] = [];

  try {
    tools = await fetchTools();
  } catch (error) {
    console.error("[Page] failed to load tools:", error);
  }

  return <HomePage tools={tools} />;
}
