import type { Metadata } from "next";
import SubmitToolPage from "@/components/submit-tool-page";

export const metadata: Metadata = {
  title: "Submit Tool — AIZinc",
  description:
    "Submit your AI tool to the AIZinc directory and reach people searching for AI solutions.",
};

export default function Page() {
  return <SubmitToolPage />;
}
