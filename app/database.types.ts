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
      Collectivities: {
        Row: {
          created_at: string
          id: number
          LastRenovationYear: string | null
          NameCollectivity: string | null
          NameEcole: string | null
          PriceLastRenovation: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          LastRenovationYear?: string | null
          NameCollectivity?: string | null
          NameEcole?: string | null
          PriceLastRenovation?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          LastRenovationYear?: string | null
          NameCollectivity?: string | null
          NameEcole?: string | null
          PriceLastRenovation?: number | null
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
