import { supabase } from "@/integrations/supabase/client";
import type { Profile, UserRole } from "@/types/database";

export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async getCurrentProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    
    return this.getProfile(user.id);
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async checkUsernameAvailable(username: string, excludeUserId?: string) {
    let query = supabase
      .from("profiles")
      .select("id")
      .eq("username", username);

    if (excludeUserId) {
      query = query.neq("id", excludeUserId);
    }

    const { data, error } = await query.maybeSingle();
    
    if (error) throw error;
    return !data;
  },

  async updateRole(userId: string, role: UserRole) {
    return this.updateProfile(userId, { role });
  },

  async updateWalletBalance(userId: string, amount: number) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ wallet_balance: amount })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async incrementWalletBalance(userId: string, increment: number) {
    const profile = await this.getProfile(userId);
    const newBalance = Number(profile.wallet_balance) + increment;
    return this.updateWalletBalance(userId, newBalance);
  },

  async decrementWalletBalance(userId: string, decrement: number) {
    const profile = await this.getProfile(userId);
    const newBalance = Number(profile.wallet_balance) - decrement;
    
    if (newBalance < 0) {
      throw new Error("Insufficient balance");
    }
    
    return this.updateWalletBalance(userId, newBalance);
  }
};