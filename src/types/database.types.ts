export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feedbacks: {
        Row: {
          created_at: string
          details: string | null
          id: number
          user_id: number
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: number
          user_id: number
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "feedbacks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string
          feedback_id: number
          id: number
          read_at: string | null
          reply_id: number
          status: Database["public"]["Enums"]["notification_status"]
          user_id: number
        }
        Insert: {
          created_at?: string
          feedback_id: number
          id?: number
          read_at?: string | null
          reply_id: number
          status?: Database["public"]["Enums"]["notification_status"]
          user_id: number
        }
        Update: {
          created_at?: string
          feedback_id?: number
          id?: number
          read_at?: string | null
          reply_id?: number
          status?: Database["public"]["Enums"]["notification_status"]
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifications_feedback_id_fkey"
            columns: ["feedback_id"]
            referencedRelation: "feedbacks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_reply_id_fkey"
            columns: ["reply_id"]
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      replies: {
        Row: {
          created_at: string
          details: string | null
          feedback_id: number
          id: number
          user_id: number
        }
        Insert: {
          created_at?: string
          details?: string | null
          feedback_id: number
          id?: number
          user_id: number
        }
        Update: {
          created_at?: string
          details?: string | null
          feedback_id?: number
          id?: number
          user_id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: number
          name: string
          type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          type?: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["user_type"]
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
      notification_status: "read" | "unread"
      user_type: "admin" | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
