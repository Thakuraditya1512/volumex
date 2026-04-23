import { supabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";

export const authService = {
  async signIn(email: string) {
    const supabaseClient = createClient();
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const supabaseClient = createClient();
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  },

  async getUserRole(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    
    if (error) return null;
    return data.role;
  },
  
  async getCurrentUser() {
    const supabaseClient = createClient();
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
  }
};
