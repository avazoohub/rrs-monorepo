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
      auctions: {
        Row: {
          bidder: string | null
          category: string | null
          created_at: string
          currentBid: number | null
          description: string | null
          endTime: string | null
          id: number
          images: string | null
          startingBid: number | null
          startTime: string | null
          status: boolean | null
          title: string | null
        }
        Insert: {
          bidder?: string | null
          category?: string | null
          created_at?: string
          currentBid?: number | null
          description?: string | null
          endTime?: string | null
          id?: number
          images?: string | null
          startingBid?: number | null
          startTime?: string | null
          status?: boolean | null
          title?: string | null
        }
        Update: {
          bidder?: string | null
          category?: string | null
          created_at?: string
          currentBid?: number | null
          description?: string | null
          endTime?: string | null
          id?: number
          images?: string | null
          startingBid?: number | null
          startTime?: string | null
          status?: boolean | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auctions_bidder_fkey"
            columns: ["bidder"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      bids: {
        Row: {
          amount: number | null
          auctionId: number | null
          created_at: string
          id: number
          userId: string | null
        }
        Insert: {
          amount?: number | null
          auctionId?: number | null
          created_at?: string
          id?: number
          userId?: string | null
        }
        Update: {
          amount?: number | null
          auctionId?: number | null
          created_at?: string
          id?: number
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_auctionId_fkey"
            columns: ["auctionId"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          title: string | null
          type: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          title?: string | null
          type?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          title?: string | null
          type?: string
        }
        Relationships: []
      }
      user_messages: {
        Row: {
          id: string
          is_read: boolean | null
          message_id: string
          user_id: string | null
        }
        Insert: {
          id?: string
          is_read?: boolean | null
          message_id: string
          user_id?: string | null
        }
        Update: {
          id?: string
          is_read?: boolean | null
          message_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_messages_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          country: string | null
          created_at: string | null
          email: string | null
          firstname: string | null
          id: string
          lastname: string | null
          mobile: string | null
          referral_code: string | null
          referrer_code: string | null
          total_points: number | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          email?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
          mobile?: string | null
          referral_code?: string | null
          referrer_code?: string | null
          total_points?: number | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          email?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          mobile?: string | null
          referral_code?: string | null
          referrer_code?: string | null
          total_points?: number | null
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
