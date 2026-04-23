import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  // First, update the session and get the initial response
  let response = await updateSession(request);

  // Initialize supabase client to check session and role
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // 1. If not logged in and trying to access protected routes, redirect to login
  const isProtectedRoute = 
    url.pathname.startsWith("/admin") || 
    url.pathname.startsWith("/student") || 
    url.pathname.startsWith("/employee");

  if (!user && isProtectedRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. If logged in and trying to access login/signup pages, redirect to their respective dashboard
  if (user && (url.pathname === "/login" || url.pathname === "/signup")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role || "student";
    
    if (role === "admin") url.pathname = "/admin";
    else if (role === "employee") url.pathname = "/employee";
    else url.pathname = "/student";

    return NextResponse.redirect(url);
  }

  // 3. Role-Based Access Control (RBAC)
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role || "student";

    // Prevent cross-dashboard access
    if (url.pathname.startsWith("/admin") && role !== "admin") {
      url.pathname = role === "employee" ? "/employee" : "/student";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/employee") && role !== "employee") {
      url.pathname = role === "admin" ? "/admin" : "/student";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/student") && role === "admin") {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/student") && role === "employee") {
        url.pathname = "/employee";
        return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
