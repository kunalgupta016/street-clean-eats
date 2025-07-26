export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          favorite_cuisines:
            | Database["public"]["Enums"]["cuisine_type"][]
            | null
          full_name: string
          id: string
          marketing_opt_in: boolean | null
          mobile_number: string | null
          preferred_location: string | null
          profile_picture_url: string | null
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          favorite_cuisines?:
            | Database["public"]["Enums"]["cuisine_type"][]
            | null
          full_name: string
          id?: string
          marketing_opt_in?: boolean | null
          mobile_number?: string | null
          preferred_location?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          favorite_cuisines?:
            | Database["public"]["Enums"]["cuisine_type"][]
            | null
          full_name?: string
          id?: string
          marketing_opt_in?: boolean | null
          mobile_number?: string | null
          preferred_location?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      vendor_details: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          average_rating: number | null
          business_description: string | null
          city: string
          created_at: string
          fssai_license_number: string | null
          hygiene_rating: number | null
          id: string
          is_fssai_certified: boolean | null
          landmark: string | null
          latitude: number | null
          longitude: number | null
          operating_hours: Json | null
          operation_type: Database["public"]["Enums"]["operation_type"]
          pincode: string
          primary_cuisine: Database["public"]["Enums"]["cuisine_type"]
          stall_images: string[] | null
          stall_name: string
          state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          average_rating?: number | null
          business_description?: string | null
          city: string
          created_at?: string
          fssai_license_number?: string | null
          hygiene_rating?: number | null
          id?: string
          is_fssai_certified?: boolean | null
          landmark?: string | null
          latitude?: number | null
          longitude?: number | null
          operating_hours?: Json | null
          operation_type: Database["public"]["Enums"]["operation_type"]
          pincode: string
          primary_cuisine: Database["public"]["Enums"]["cuisine_type"]
          stall_images?: string[] | null
          stall_name: string
          state: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          average_rating?: number | null
          business_description?: string | null
          city?: string
          created_at?: string
          fssai_license_number?: string | null
          hygiene_rating?: number | null
          id?: string
          is_fssai_certified?: boolean | null
          landmark?: string | null
          latitude?: number | null
          longitude?: number | null
          operating_hours?: Json | null
          operation_type?: Database["public"]["Enums"]["operation_type"]
          pincode?: string
          primary_cuisine?: Database["public"]["Enums"]["cuisine_type"]
          stall_images?: string[] | null
          stall_name?: string
          state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vendor_hygiene_practices: {
        Row: {
          clean_uniforms: boolean | null
          created_at: string
          hygiene_photo_urls: string[] | null
          id: string
          proper_waste_disposal: boolean | null
          regular_cleaning: boolean | null
          serves_purified_water: boolean | null
          updated_at: string
          uses_gloves: boolean | null
          vendor_id: string
        }
        Insert: {
          clean_uniforms?: boolean | null
          created_at?: string
          hygiene_photo_urls?: string[] | null
          id?: string
          proper_waste_disposal?: boolean | null
          regular_cleaning?: boolean | null
          serves_purified_water?: boolean | null
          updated_at?: string
          uses_gloves?: boolean | null
          vendor_id: string
        }
        Update: {
          clean_uniforms?: boolean | null
          created_at?: string
          hygiene_photo_urls?: string[] | null
          id?: string
          proper_waste_disposal?: boolean | null
          regular_cleaning?: boolean | null
          serves_purified_water?: boolean | null
          updated_at?: string
          uses_gloves?: boolean | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_hygiene_practices_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_details"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_sustainability_practices: {
        Row: {
          composts_food_waste: boolean | null
          created_at: string
          id: string
          interested_in_waste_initiatives: boolean | null
          minimizes_plastic: boolean | null
          offers_reusable_containers: boolean | null
          recycles_packaging: boolean | null
          segregates_waste: boolean | null
          updated_at: string
          uses_biodegradable_packaging: boolean | null
          uses_public_bins: boolean | null
          vendor_id: string
          works_with_waste_collector: boolean | null
        }
        Insert: {
          composts_food_waste?: boolean | null
          created_at?: string
          id?: string
          interested_in_waste_initiatives?: boolean | null
          minimizes_plastic?: boolean | null
          offers_reusable_containers?: boolean | null
          recycles_packaging?: boolean | null
          segregates_waste?: boolean | null
          updated_at?: string
          uses_biodegradable_packaging?: boolean | null
          uses_public_bins?: boolean | null
          vendor_id: string
          works_with_waste_collector?: boolean | null
        }
        Update: {
          composts_food_waste?: boolean | null
          created_at?: string
          id?: string
          interested_in_waste_initiatives?: boolean | null
          minimizes_plastic?: boolean | null
          offers_reusable_containers?: boolean | null
          recycles_packaging?: boolean | null
          segregates_waste?: boolean | null
          updated_at?: string
          uses_biodegradable_packaging?: boolean | null
          uses_public_bins?: boolean | null
          vendor_id?: string
          works_with_waste_collector?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_sustainability_practices_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_details"
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
      cuisine_type:
        | "indian"
        | "chinese"
        | "italian"
        | "fast_food"
        | "desserts"
        | "south_indian"
        | "north_indian"
        | "regional"
        | "healthy"
        | "other"
      operation_type: "permanent_stall" | "mobile_cart" | "popup_events"
      user_type: "customer" | "vendor"
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
    Enums: {
      cuisine_type: [
        "indian",
        "chinese",
        "italian",
        "fast_food",
        "desserts",
        "south_indian",
        "north_indian",
        "regional",
        "healthy",
        "other",
      ],
      operation_type: ["permanent_stall", "mobile_cart", "popup_events"],
      user_type: ["customer", "vendor"],
    },
  },
} as const
