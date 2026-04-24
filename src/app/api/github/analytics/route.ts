import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get stored token from supabase
    const { data: connection, error: connError } = await (supabase
      .from("github_connections") as any)
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (connError || !connection) {
      return NextResponse.json({ error: "Not connected" }, { status: 401 });
    }

    const token = (connection as any).access_token;

    // Fetch repos and user details in parallel
    const [reposRes, userRes] = await Promise.all([
      fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!reposRes.ok || !userRes.ok) {
        throw new Error("GitHub API request failed");
    }

    const repos = await reposRes.json();
    const githubUser = await userRes.json();

    // Calculate language distribution
    const languages: any = {};
    repos.forEach((r: any) => {
      if (r.language) {
        languages[r.language] = (languages[r.language] || 0) + 1;
      }
    });

    const totalLangs = Object.values(languages).reduce((a: any, b: any) => a + b, 0);
    Object.keys(languages).forEach((k) => {
      languages[k] = Math.round((languages[k] / (totalLangs as number)) * 100);
    });

    // Sort and limit top repos
    const topRepos = repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
      }));

    // Stats aggregation
    const stats = {
      repos: repos.length,
      stars: repos.reduce((a: number, r: any) => a + r.stargazers_count, 0),
      followers: githubUser.followers,
      commits: 0, // In a real app, you'd aggregate this from events or GraphQL
    };

    // Try to get actual commit count from events
    const eventsRes = await fetch(`https://api.github.com/users/${githubUser.login}/events/public`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (eventsRes.ok) {
        const events = await eventsRes.json();
        let commitCount = 0;
        if (Array.isArray(events)) {
            events.forEach((event: any) => {
                if (event.type === "PushEvent") {
                    commitCount += event.payload.commits?.length || 0;
                }
            });
        }
        stats.commits = commitCount;
    }

    return NextResponse.json({
      stats,
      languages,
      topRepos,
      // Mock contributions for visualization (can be replaced with GraphQL data)
      contributions: Array(140).fill(0).map(() => ({ count: Math.floor(Math.random() * 12) })),
    });
  } catch (error) {
    console.error("GitHub Analytics Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
