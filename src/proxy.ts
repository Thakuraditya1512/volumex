import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/lib/database.types";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
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

  // 2. If logged in, check role and enforce dashboard access
  if (user) {
    // Fetch user profile to get role
    // NOTE: This could be optimized by storing role in JWT metadata
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = (profile as any)?.role || "student";

    // If logged in and on login/signup page, redirect to dashboard
    if (url.pathname === "/login" || url.pathname === "/signup") {
      if (role === "admin") url.pathname = "/admin";
      else if (role === "employee") url.pathname = "/employee";
      else url.pathname = "/student";
      return NextResponse.redirect(url);
    }

    // Role-Based Access Control (RBAC)
    if (url.pathname.startsWith("/admin") && role !== "admin") {
      url.pathname = role === "employee" ? "/employee" : "/student";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/employee") && role !== "employee") {
      url.pathname = role === "admin" ? "/admin" : "/student";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/student") && (role === "admin" || role === "employee")) {
      url.pathname = role === "admin" ? "/admin" : "/employee";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
