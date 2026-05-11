import { supabase } from "@/integrations/supabase/client";
import type { Store } from "@/types/database";

export const storeService = {
  async getStoreByUsername(username: string) {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("username", username)
      .single();

    if (error) throw error;
    return data as Store;
  },

  async getStoreById(id: string) {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Store;
  },

  async getStoreByUserId(userId: string) {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    return data as Store | null;
  },

  async createStore(storeData: any) {
    const { data, error } = await supabase
      .from("stores")
      .insert(storeData)
      .select()
      .single();

    if (error) throw error;
    return data as Store;
  },

  async updateStore(id: string, updates: any) {
    const { data, error } = await supabase
      .from("stores")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Store;
  },

  async checkUsernameAvailable(username: string, excludeId?: string) {
    let query = supabase
      .from("stores")
      .select("id")
      .eq("username", username);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query.maybeSingle();
    
    if (error) throw error;
    return !data;
  },

  async incrementSales(id: string) {
    const store = await this.getStoreById(id);
    const { data, error } = await supabase
      .from("stores")
      .update({ total_sales: store.total_sales + 1 })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
