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
      admin_users: {
        Row: {
          created_at: string
          id: string
          is_superadmin: boolean | null
        }
        Insert: {
          created_at?: string
          id: string
          is_superadmin?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          is_superadmin?: boolean | null
        }
        Relationships: []
      }
      attendance_records: {
        Row: {
          created_at: string
          date: string
          employee_id: string
          id: string
          notes: string | null
          status: string
          time_in: string | null
          time_out: string | null
        }
        Insert: {
          created_at?: string
          date: string
          employee_id: string
          id?: string
          notes?: string | null
          status: string
          time_in?: string | null
          time_out?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          status?: string
          time_in?: string | null
          time_out?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      boats: {
        Row: {
          capacity: number
          created_at: string
          description: string
          features: string[] | null
          id: string
          images: string[]
          location: string
          name: string
          price_per_hour: number
          rating: number | null
          type: string
        }
        Insert: {
          capacity: number
          created_at?: string
          description: string
          features?: string[] | null
          id?: string
          images: string[]
          location: string
          name: string
          price_per_hour: number
          rating?: number | null
          type: string
        }
        Update: {
          capacity?: number
          created_at?: string
          description?: string
          features?: string[] | null
          id?: string
          images?: string[]
          location?: string
          name?: string
          price_per_hour?: number
          rating?: number | null
          type?: string
        }
        Relationships: []
      }
      booking_guests: {
        Row: {
          age: string
          booking_id: string | null
          created_at: string | null
          id: string
          id_number: string
          id_type: string
          name: string
          photo_path: string | null
        }
        Insert: {
          age: string
          booking_id?: string | null
          created_at?: string | null
          id?: string
          id_number: string
          id_type: string
          name: string
          photo_path?: string | null
        }
        Update: {
          age?: string
          booking_id?: string | null
          created_at?: string | null
          id?: string
          id_number?: string
          id_type?: string
          name?: string
          photo_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_guests_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          boat_id: string
          boat_name: string
          created_at: string | null
          date: string
          duration: number
          guest_count: number
          id: string
          ticket_id: string
          time: string
          total_price: number
          user_id: string | null
        }
        Insert: {
          boat_id: string
          boat_name: string
          created_at?: string | null
          date: string
          duration: number
          guest_count: number
          id?: string
          ticket_id: string
          time: string
          total_price: number
          user_id?: string | null
        }
        Update: {
          boat_id?: string
          boat_name?: string
          created_at?: string | null
          date?: string
          duration?: number
          guest_count?: number
          id?: string
          ticket_id?: string
          time?: string
          total_price?: number
          user_id?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          tax_id: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          tax_id: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          tax_id?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          created_at: string
          description: string
          discounted_price: number
          id: string
          image_url: string
          location: string
          original_price: number
          title: string
          valid_until: string
        }
        Insert: {
          created_at?: string
          description: string
          discounted_price: number
          id?: string
          image_url: string
          location: string
          original_price: number
          title: string
          valid_until: string
        }
        Update: {
          created_at?: string
          description?: string
          discounted_price?: number
          id?: string
          image_url?: string
          location?: string
          original_price?: number
          title?: string
          valid_until?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          company_id: string
          created_at: string
          department: string
          email: string
          first_name: string
          hire_date: string
          hourly_rate: number
          id: string
          last_name: string
          phone: string | null
          position: string
          skills: string[]
          status: string
          tax_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          department: string
          email: string
          first_name: string
          hire_date: string
          hourly_rate: number
          id?: string
          last_name: string
          phone?: string | null
          position: string
          skills?: string[]
          status: string
          tax_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          department?: string
          email?: string
          first_name?: string
          hire_date?: string
          hourly_rate?: number
          id?: string
          last_name?: string
          phone?: string | null
          position?: string
          skills?: string[]
          status?: string
          tax_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          created_at: string
          employee_id: string
          end_date: string
          id: string
          reason: string
          start_date: string
          status: string
          type: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          end_date: string
          id?: string
          reason: string
          start_date: string
          status: string
          type: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          end_date?: string
          id?: string
          reason?: string
          start_date?: string
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_deductions: {
        Row: {
          amount: number
          created_at: string
          id: string
          payroll_record_id: string
          type: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payroll_record_id: string
          type: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payroll_record_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_deductions_payroll_record_id_fkey"
            columns: ["payroll_record_id"]
            isOneToOne: false
            referencedRelation: "payroll_records"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_records: {
        Row: {
          created_at: string
          employee_id: string
          gross_pay: number
          id: string
          net_pay: number
          overtime_hours: number
          payment_date: string | null
          period_end: string
          period_start: string
          regular_hours: number
          status: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          gross_pay: number
          id?: string
          net_pay: number
          overtime_hours: number
          payment_date?: string | null
          period_end: string
          period_start: string
          regular_hours: number
          status: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          gross_pay?: number
          id?: string
          net_pay?: number
          overtime_hours?: number
          payment_date?: string | null
          period_end?: string
          period_start?: string
          regular_hours?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      admin_dashboard_stats: {
        Row: {
          total_bookings: number | null
          total_customers: number | null
          total_guests: number | null
          total_revenue: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_superadmin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
