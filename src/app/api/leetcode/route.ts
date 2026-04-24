import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Using a reliable public LeetCode stats API
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    
    if (!res.ok) {
        throw new Error("Failed to fetch from LeetCode API");
    }

    const data = await res.json();

    if (data.status === "error") {
      return NextResponse.json({ error: data.message || "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      totalSolved: data.totalSolved,
      totalQuestions: data.totalQuestions,
      easy: data.easySolved,
      medium: data.mediumSolved,
      hard: data.hardSolved,
      acceptance: data.acceptanceRate,
      ranking: data.ranking,
      contributionPoints: data.contributionPoints,
      reputation: data.reputation,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
