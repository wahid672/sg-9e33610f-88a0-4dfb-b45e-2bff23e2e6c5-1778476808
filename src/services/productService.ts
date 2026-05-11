import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/database";

export const productService = {
  async getProducts(filters?: {
    category?: string;
    storeId?: string;
    search?: string;
    isActive?: boolean;
  }) {
    let query = supabase
      .from("products")
      .select(`
        *,
        store:stores(id, username, display_name, logo_url, rating),
        category:categories(id, name, slug)
      `)
      .order("created_at", { ascending: false });

    if (filters?.category) {
      query = query.eq("category_id", filters.category);
    }

    if (filters?.storeId) {
      query = query.eq("store_id", filters.storeId);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.isActive !== undefined) {
      query = query.eq("is_active", filters.isActive);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  async getProductBySlug(slug: string) {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        store:stores(id, username, display_name, description, logo_url, banner_url, rating, total_sales),
        category:categories(id, name, slug)
      `)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        store:stores(id, username, display_name, logo_url, rating),
        category:categories(id, name, slug)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createProduct(productData: any) {
    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, updates: any) {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async incrementSales(id: string) {
    const product = await this.getProductById(id);
    const { data, error } = await supabase
      .from("products")
      .update({ total_sales: product.total_sales + 1 })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
