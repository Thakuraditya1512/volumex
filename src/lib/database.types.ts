// Auto-generated TypeScript types for the SkillBridge Supabase schema
// Run the SQL in supabase_schema.sql to create these tables

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type UserRole = "student" | "employee" | "admin";
export type UserStatus = "active" | "suspended" | "pending";
export type EnrollmentStatus = "enrolled" | "completed" | "dropped";
export type SystemStatus = "healthy" | "warning" | "error";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string;
          role: UserRole;
          status: UserStatus;
          avatar_url: string | null;
          bio: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email: string;
          role?: UserRole;
          status?: UserStatus;
          avatar_url?: string | null;
          bio?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          email?: string;
          role?: UserRole;
          status?: UserStatus;
          avatar_url?: string | null;
          bio?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          updated_at?: string;
        };
      };
      roadmaps: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          steps: Json;
          created_by: string;
          is_published: boolean;
          enrolled_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          steps?: Json;
          created_by: string;
          is_published?: boolean;
          enrolled_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          steps?: Json;
          is_published?: boolean;
          enrolled_count?: number;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          roadmap_id: string | null;
          created_by: string;
          is_published: boolean;
          enrolled_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          roadmap_id?: string | null;
          created_by: string;
          is_published?: boolean;
          enrolled_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          roadmap_id?: string | null;
          is_published?: boolean;
          enrolled_count?: number;
          updated_at?: string;
        };
      };
      assessments: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          course_id: string | null;
          created_by: string;
          is_published: boolean;
          max_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          course_id?: string | null;
          created_by: string;
          is_published?: boolean;
          max_score?: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          is_published?: boolean;
          max_score?: number;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          user_id: string;
          github_url: string | null;
          live_url: string | null;
          tech_stack: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          user_id: string;
          github_url?: string | null;
          live_url?: string | null;
          tech_stack?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          github_url?: string | null;
          live_url?: string | null;
          tech_stack?: string[];
          updated_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          color: string;
          criteria: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon: string;
          color?: string;
          criteria: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          description?: string;
          icon?: string;
          color?: string;
          criteria?: string;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          awarded_at: string;
          awarded_by: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          awarded_at?: string;
          awarded_by?: string | null;
        };
        Update: {};
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          roadmap_id: string | null;
          course_id: string | null;
          progress_percent: number;
          status: EnrollmentStatus;
          streak_days: number;
          last_active: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          roadmap_id?: string | null;
          course_id?: string | null;
          progress_percent?: number;
          status?: EnrollmentStatus;
          streak_days?: number;
          last_active?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          progress_percent?: number;
          status?: EnrollmentStatus;
          streak_days?: number;
          last_active?: string;
          updated_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          body: string;
          created_by: string;
          target_role: UserRole | "all";
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body: string;
          created_by: string;
          target_role?: UserRole | "all";
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          body?: string;
          target_role?: UserRole | "all";
          is_active?: boolean;
        };
      };
      platform_stats: {
        Row: {
          id: string;
          date: string;
          total_users: number;
          active_users: number;
          new_users: number;
          total_students: number;
          total_employees: number;
          total_admins: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          total_users?: number;
          active_users?: number;
          new_users?: number;
          total_students?: number;
          total_employees?: number;
          total_admins?: number;
          created_at?: string;
        };
        Update: {};
      };
      user_tasks: {
        Row: {
          id: string;
          user_id: string;
          module_id: number;
          title: string;
          type: "video" | "quiz" | "link" | "text";
          content_url: string | null;
          content_body: string | null;
          status: "locked" | "available" | "done";
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_id: number;
          title: string;
          type: "video" | "quiz" | "link" | "text";
          content_url?: string | null;
          content_body?: string | null;
          status?: "locked" | "available" | "done";
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          title?: string;
          status?: "locked" | "available" | "done";
          completed_at?: string | null;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          xp_earned: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          xp_earned: number;
          created_at?: string;
        };
        Update: {};
      };
      modules: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          order: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          order?: number;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

// ── Convenient row types ──────────────────────────────────────────────────────
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Roadmap = Database["public"]["Tables"]["roadmaps"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Assessment = Database["public"]["Tables"]["assessments"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Badge = Database["public"]["Tables"]["badges"]["Row"];
export type UserBadge = Database["public"]["Tables"]["user_badges"]["Row"];
export type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
export type Announcement = Database["public"]["Tables"]["announcements"]["Row"];
export type PlatformStat = Database["public"]["Tables"]["platform_stats"]["Row"];
