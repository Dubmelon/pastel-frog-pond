export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          collapsed: boolean | null
          id: string
          name: string
          position: number
          server_id: string | null
        }
        Insert: {
          collapsed?: boolean | null
          id?: string
          name: string
          position?: number
          server_id?: string | null
        }
        Update: {
          collapsed?: boolean | null
          id?: string
          name?: string
          position?: number
          server_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_member_states: {
        Row: {
          channel_id: string | null
          created_at: string | null
          id: string
          last_read_at: string | null
          mention_count: number | null
          muted: boolean | null
          user_id: string | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string | null
          id?: string
          last_read_at?: string | null
          mention_count?: number | null
          muted?: boolean | null
          user_id?: string | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string | null
          id?: string
          last_read_at?: string | null
          mention_count?: number | null
          muted?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_member_states_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_member_states_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_pins: {
        Row: {
          channel_id: string | null
          id: string
          message_id: string | null
          pinned_at: string | null
          pinned_by: string | null
        }
        Insert: {
          channel_id?: string | null
          id?: string
          message_id?: string | null
          pinned_at?: string | null
          pinned_by?: string | null
        }
        Update: {
          channel_id?: string | null
          id?: string
          message_id?: string | null
          pinned_at?: string | null
          pinned_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_pins_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_pins_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_role_permissions: {
        Row: {
          channel_id: string | null
          created_at: string | null
          id: string
          permissions: Json
          role_id: string | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string | null
          id?: string
          permissions?: Json
          role_id?: string | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string | null
          id?: string
          permissions?: Json
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_role_permissions_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          name: string
          position: number
          region: string | null
          server_id: string | null
          settings: Json | null
          topic: string | null
          type: Database["public"]["Enums"]["channel_type"]
          updated_at: string | null
          user_limit: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          position?: number
          region?: string | null
          server_id?: string | null
          settings?: Json | null
          topic?: string | null
          type?: Database["public"]["Enums"]["channel_type"]
          updated_at?: string | null
          user_limit?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          position?: number
          region?: string | null
          server_id?: string | null
          settings?: Json | null
          topic?: string | null
          type?: Database["public"]["Enums"]["channel_type"]
          updated_at?: string | null
          user_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          code: string
          created_at: string | null
          creator_id: string | null
          expires_at: string | null
          id: string
          max_uses: number | null
          server_id: string | null
          uses: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          creator_id?: string | null
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          server_id?: string | null
          uses?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          creator_id?: string | null
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          server_id?: string | null
          uses?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invites_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      member_roles: {
        Row: {
          member_id: string
          role_id: string
        }
        Insert: {
          member_id: string
          role_id: string
        }
        Update: {
          member_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_roles_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "server_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_edits: {
        Row: {
          content: string
          edited_at: string | null
          id: string
          message_id: string | null
        }
        Insert: {
          content: string
          edited_at?: string | null
          id?: string
          message_id?: string | null
        }
        Update: {
          content?: string
          edited_at?: string | null
          id?: string
          message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_edits_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          author_id: string | null
          channel_id: string | null
          content: string | null
          created_at: string | null
          edited_at: string | null
          id: string
          reply_count: number | null
          thread_id: string | null
        }
        Insert: {
          attachments?: Json | null
          author_id?: string | null
          channel_id?: string | null
          content?: string | null
          created_at?: string | null
          edited_at?: string | null
          id?: string
          reply_count?: number | null
          thread_id?: string | null
        }
        Update: {
          attachments?: Json | null
          author_id?: string | null
          channel_id?: string | null
          content?: string | null
          created_at?: string | null
          edited_at?: string | null
          id?: string
          reply_count?: number | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          custom_status: string | null
          id: string
          notification_preferences: Json | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string | null
          username: string
          voice_settings: Json | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          custom_status?: string | null
          id: string
          notification_preferences?: Json | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
          username: string
          voice_settings?: Json | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          custom_status?: string | null
          id?: string
          notification_preferences?: Json | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
          username?: string
          voice_settings?: Json | null
        }
        Relationships: []
      }
      reactions: {
        Row: {
          created_at: string | null
          emoji: string
          id: string
          message_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          emoji: string
          id?: string
          message_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          emoji?: string
          id?: string
          message_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          name: string
          permissions: Json
          position: number
          server_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
          permissions?: Json
          position?: number
          server_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
          permissions?: Json
          position?: number
          server_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roles_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_boosts: {
        Row: {
          ends_at: string | null
          id: string
          server_id: string | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          ends_at?: string | null
          id?: string
          server_id?: string | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          ends_at?: string | null
          id?: string
          server_id?: string | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "server_boosts_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_members: {
        Row: {
          id: string
          joined_at: string | null
          nickname: string | null
          roles: Json | null
          server_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          nickname?: string | null
          roles?: Json | null
          server_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          nickname?: string | null
          roles?: Json | null
          server_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "server_members_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      servers: {
        Row: {
          created_at: string | null
          features: Json | null
          icon_url: string | null
          id: string
          metadata: Json | null
          name: string
          owner_id: string | null
          updated_at: string | null
          verification_level: number | null
        }
        Insert: {
          created_at?: string | null
          features?: Json | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          name: string
          owner_id?: string | null
          updated_at?: string | null
          verification_level?: number | null
        }
        Update: {
          created_at?: string | null
          features?: Json | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          owner_id?: string | null
          updated_at?: string | null
          verification_level?: number | null
        }
        Relationships: []
      }
      voice_states: {
        Row: {
          channel_id: string | null
          deafened: boolean | null
          id: string
          joined_at: string | null
          muted: boolean | null
          screen_share: boolean | null
          user_id: string | null
          video_enabled: boolean | null
        }
        Insert: {
          channel_id?: string | null
          deafened?: boolean | null
          id?: string
          joined_at?: string | null
          muted?: boolean | null
          screen_share?: boolean | null
          user_id?: string | null
          video_enabled?: boolean | null
        }
        Update: {
          channel_id?: string | null
          deafened?: boolean | null
          id?: string
          joined_at?: string | null
          muted?: boolean | null
          screen_share?: boolean | null
          user_id?: string | null
          video_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_states_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_server: {
        Args: {
          server_name: string
          user_id: string
        }
        Returns: string
      }
      create_server_invite: {
        Args: {
          server_id_input: string
          max_uses?: number
          expires_in?: unknown
        }
        Returns: string
      }
      generate_unique_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      channel_type: "TEXT" | "VOICE" | "ANNOUNCEMENT"
      user_status: "ONLINE" | "IDLE" | "DND" | "OFFLINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
