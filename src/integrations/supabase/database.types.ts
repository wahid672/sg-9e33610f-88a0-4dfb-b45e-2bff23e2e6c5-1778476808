 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          affiliate_id: string
          created_at: string | null
          id: string
          ip_address: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          affiliate_id: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_id?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_earnings: {
        Row: {
          affiliate_id: string
          commission_amount: number
          commission_percentage: number
          created_at: string | null
          id: string
          order_id: string
          status: string
        }
        Insert: {
          affiliate_id: string
          commission_amount: number
          commission_percentage: number
          created_at?: string | null
          id?: string
          order_id: string
          status?: string
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number
          commission_percentage?: number
          created_at?: string | null
          id?: string
          order_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_earnings_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_earnings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          product_id: string
          total_clicks: number | null
          total_conversions: number | null
          total_earnings: number | null
          user_id: string
        }
        Insert: {
          affiliate_code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          product_id: string
          total_clicks?: number | null
          total_conversions?: number | null
          total_earnings?: number | null
          user_id: string
        }
        Update: {
          affiliate_code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          product_id?: string
          total_clicks?: number | null
          total_conversions?: number | null
          total_earnings?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliates_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          product_id: string
          product_price: number
          product_title: string
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          product_id: string
          product_price: number
          product_title: string
          quantity?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          product_id?: string
          product_price?: number
          product_title?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          affiliate_commission: number | null
          affiliate_id: string | null
          buyer_id: string
          created_at: string | null
          expired_at: string | null
          id: string
          order_number: string
          paid_at: string | null
          payment_method: string | null
          payment_reference: string | null
          status: string
          store_id: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          affiliate_commission?: number | null
          affiliate_id?: string | null
          buyer_id: string
          created_at?: string | null
          expired_at?: string | null
          id?: string
          order_number: string
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          status?: string
          store_id: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          affiliate_commission?: number | null
          affiliate_id?: string | null
          buyer_id?: string
          created_at?: string | null
          expired_at?: string | null
          id?: string
          order_number?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          status?: string
          store_id?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          checkout_url: string | null
          created_at: string | null
          expired_at: string | null
          fee: number | null
          id: string
          merchant_ref: string
          order_id: string
          paid_at: string | null
          pay_url: string | null
          payment_method: string
          payment_name: string | null
          qr_url: string | null
          status: string
          total_amount: number
          tripay_reference: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          checkout_url?: string | null
          created_at?: string | null
          expired_at?: string | null
          fee?: number | null
          id?: string
          merchant_ref: string
          order_id: string
          paid_at?: string | null
          pay_url?: string | null
          payment_method: string
          payment_name?: string | null
          qr_url?: string | null
          status?: string
          total_amount: number
          tripay_reference: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          checkout_url?: string | null
          created_at?: string | null
          expired_at?: string | null
          fee?: number | null
          id?: string
          merchant_ref?: string
          order_id?: string
          paid_at?: string | null
          pay_url?: string | null
          payment_method?: string
          payment_name?: string | null
          qr_url?: string | null
          status?: string
          total_amount?: number
          tripay_reference?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          affiliate_commission_percentage: number | null
          category_id: string | null
          created_at: string | null
          description: string | null
          discount_price: number | null
          external_link: string | null
          file_url: string | null
          gallery_urls: Json | null
          id: string
          instructions: string | null
          is_active: boolean | null
          is_affiliate_enabled: boolean | null
          license_key: string | null
          price: number
          product_type: string
          slug: string
          store_id: string
          tags: Json | null
          thumbnail_url: string | null
          title: string
          total_sales: number | null
          updated_at: string | null
        }
        Insert: {
          affiliate_commission_percentage?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          external_link?: string | null
          file_url?: string | null
          gallery_urls?: Json | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          is_affiliate_enabled?: boolean | null
          license_key?: string | null
          price: number
          product_type: string
          slug: string
          store_id: string
          tags?: Json | null
          thumbnail_url?: string | null
          title: string
          total_sales?: number | null
          updated_at?: string | null
        }
        Update: {
          affiliate_commission_percentage?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          external_link?: string | null
          file_url?: string | null
          gallery_urls?: Json | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          is_affiliate_enabled?: boolean | null
          license_key?: string | null
          price?: number
          product_type?: string
          slug?: string
          store_id?: string
          tags?: Json | null
          thumbnail_url?: string | null
          title?: string
          total_sales?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          phone: string | null
          role: string | null
          updated_at: string | null
          username: string | null
          wallet_balance: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          wallet_balance?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          wallet_balance?: number | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      stores: {
        Row: {
          banner_url: string | null
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          is_active: boolean | null
          logo_url: string | null
          rating: number | null
          social_links: Json | null
          total_products: number | null
          total_sales: number | null
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          rating?: number | null
          social_links?: Json | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          rating?: number | null
          social_links?: Json | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      withdrawals: {
        Row: {
          account_name: string
          account_number: string
          admin_note: string | null
          amount: number
          bank_name: string
          created_at: string | null
          id: string
          processed_at: string | null
          processed_by: string | null
          status: string
          user_id: string
        }
        Insert: {
          account_name: string
          account_number: string
          admin_note?: string | null
          amount: number
          bank_name: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          user_id: string
        }
        Update: {
          account_name?: string
          account_number?: string
          admin_note?: string | null
          amount?: number
          bank_name?: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
