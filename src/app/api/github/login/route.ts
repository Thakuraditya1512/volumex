import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const redirect_uri = `${baseUrl}/github-callback`;

  if (!client_id) {
    return NextResponse.json({ error: "GITHUB_CLIENT_ID is not configured" }, { status: 500 });
  }

  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo user`;

  return NextResponse.redirect(githubUrl);
}
