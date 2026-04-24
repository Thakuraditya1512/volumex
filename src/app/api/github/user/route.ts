import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get stored token
    const { data: connection, error: connError } = await (supabase
      .from("github_connections") as any)
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (connError || !connection) {
      return NextResponse.json({ error: "Not connected" }, { status: 401 });
    }

    const token = (connection as any).access_token;

    // Fetch repos
    const repoRes = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!repoRes.ok) {
      return NextResponse.json({ error: "Failed to fetch repos" }, { status: repoRes.status });
    }

    const repos = await repoRes.json();

    // Fetch events (for commits)
    const eventsRes = await fetch(`https://api.github.com/users/${(connection as any).username}/events/public`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const events = await eventsRes.json();

    let commitCount = 0;
    if (Array.isArray(events)) {
      events.forEach((event: any) => {
        if (event.type === "PushEvent") {
          commitCount += event.payload.commits?.length || 0;
        }
      });
    }

    return NextResponse.json({
      username: (connection as any).username,
      repos: Array.isArray(repos) ? repos.length : 0,
      commits: commitCount,
    });
  } catch (error) {
    console.error("GitHub User API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
