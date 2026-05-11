<![CDATA[
import { supabase } from "@/integrations/supabase/client";
import type { Category } from "@/types/database";

export const categoryService = {
  async getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data as Category[];
  },

  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as Category;
  }
};
</file_contents>
