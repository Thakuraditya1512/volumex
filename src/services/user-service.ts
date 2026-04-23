import { supabase } from "@/lib/supabase";
import { User } from "@/types";


export const userService = {
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      return [];
    }

    return data as unknown as User[];
  },

  async updateUserStatus(userId: string, status: "active" | "suspended" | "pending") {
    const { data, error } = await supabase
      .from("profiles")
      .update({ status })
      .eq("id", userId);

    if (error) throw error;
    return data;
  },
};
