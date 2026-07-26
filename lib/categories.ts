import { createSupabaseClient, getSupabaseEnvError } from "./supabase";
import { CategoryRecord } from "./types";

type SupabaseCategoryRow = {
  id: string | number;
  name: string;
  display_label: string | null;
};

export async function fetchCategories(): Promise<CategoryRecord[]> {
  const configError = getSupabaseEnvError();
  if (configError) {
    throw new Error(configError);
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, display_label")
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row: SupabaseCategoryRow) => ({
    id: String(row.id),
    name: row.name.trim(),
    displayLabel: row.display_label?.trim() || row.name.trim(),
  }));
}
