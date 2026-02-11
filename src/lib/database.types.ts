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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      donors: {
        Row: {
          id: number
          created_at: string
          name: string | null
          email: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name?: string | null
          email?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string | null
          email?: string | null
        }
        Relationships: []
      }
      member_subteams: {
        Row: {
          member_id: string
          subteam_id: string
        }
        Insert: {
          member_id: string
          subteam_id: string
        }
        Update: {
          member_id?: string
          subteam_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_subteams_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subteams_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members_with_subteams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subteams_subteam_id_fkey"
            columns: ["subteam_id"]
            isOneToOne: false
            referencedRelation: "subteams"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          bio: string | null
          created_at: string | null
          display_order: number | null
          email: string | null
          id: string
          is_lead: boolean | null
          links: Json | null
          name: string
          photo_path: string | null
          role: string
          tags: Json | null
          year: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_lead?: boolean | null
          links?: Json | null
          name: string
          photo_path?: string | null
          role: string
          tags?: Json | null
          year?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_lead?: boolean | null
          links?: Json | null
          name?: string
          photo_path?: string | null
          role?: string
          tags?: Json | null
          year?: string | null
        }
        Relationships: []
      }
      mentors: {
        Row: {
          affiliation: string
          bio: string | null
          created_at: string | null
          display_order: number | null
          expertise: Json | null
          id: string
          links: Json | null
          name: string
          photo_path: string | null
          title: string
        }
        Insert: {
          affiliation: string
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          expertise?: Json | null
          id?: string
          links?: Json | null
          name: string
          photo_path?: string | null
          title: string
        }
        Update: {
          affiliation?: string
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          expertise?: Json | null
          id?: string
          links?: Json | null
          name?: string
          photo_path?: string | null
          title?: string
        }
        Relationships: []
      }
      sponsor_tiers: {
        Row: {
          display_order: number | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          display_order?: number | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          display_order?: number | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          blurb: string | null
          created_at: string | null
          cta_copy: string | null
          cta_email: string | null
          cta_headline: string | null
          display_order: number | null
          id: string
          logo_path: string | null
          name: string
          tier_id: string | null
          url: string | null
          white_on_dark: boolean | null
        }
        Insert: {
          blurb?: string | null
          created_at?: string | null
          cta_copy?: string | null
          cta_email?: string | null
          cta_headline?: string | null
          display_order?: number | null
          id?: string
          logo_path?: string | null
          name: string
          tier_id?: string | null
          url?: string | null
          white_on_dark?: boolean | null
        }
        Update: {
          blurb?: string | null
          created_at?: string | null
          cta_copy?: string | null
          cta_email?: string | null
          cta_headline?: string | null
          display_order?: number | null
          id?: string
          logo_path?: string | null
          name?: string
          tier_id?: string | null
          url?: string | null
          white_on_dark?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "sponsor_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      subteams: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      team_info: {
        Row: {
          blurb: string
          id: string
          pillars: Json | null
          team_photo_path: string | null
        }
        Insert: {
          blurb: string
          id?: string
          pillars?: Json | null
          team_photo_path?: string | null
        }
        Update: {
          blurb?: string
          id?: string
          pillars?: Json | null
          team_photo_path?: string | null
        }
        Relationships: []
      }
      updates: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          date: string
          id: string
          images: Json | null
          links: Json | null
          published: boolean | null
          slug: string
          summary: string
          tags: Json | null
          title: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          date: string
          id?: string
          images?: Json | null
          links?: Json | null
          published?: boolean | null
          slug: string
          summary: string
          tags?: Json | null
          title: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          date?: string
          id?: string
          images?: Json | null
          links?: Json | null
          published?: boolean | null
          slug?: string
          summary?: string
          tags?: Json | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      members_with_subteams: {
        Row: {
          bio: string | null
          created_at: string | null
          display_order: number | null
          email: string | null
          id: string | null
          is_lead: boolean | null
          links: Json | null
          name: string | null
          photo_path: string | null
          role: string | null
          subteam: string | null
          tags: Json | null
          year: string | null
        }
        Relationships: []
      }
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
