import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 });
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    const access_token = tokenData.access_token;

    if (!access_token) {
      return NextResponse.json({ error: "Failed to exchange authorization code for access token" }, { status: 401 });
    }

    // Fetch GitHub user
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const githubUser = await userRes.json();

    // Get current Supabase user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "User session not found. Please log in again." }, { status: 401 });
    }

    // Save in Supabase
    const { error } = await (supabase.from("github_connections") as any).upsert({
      user_id: user.id,
      github_id: githubUser.id.toString(),
      username: githubUser.login,
      access_token,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save connection to database" }, { status: 500 });
    }

    return NextResponse.json({ success: true, username: githubUser.login });
  } catch (error) {
    console.error("GitHub Auth Error:", error);
    return NextResponse.json({ error: "Internal server error during GitHub authentication" }, { status: 500 });
  }
}
