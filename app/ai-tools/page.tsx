import type { Metadata } from "next";
import CategoriesPage from "@/components/categories-page";

export const metadata: Metadata = {
  title: "All AI Tool Categories — AIZinc",
  description:
    "Browse AI tool categories and find the most popular and featured tools for writing, coding, design, automation, and more.",
};

export default function Page() {
  return <CategoriesPage />;
}
