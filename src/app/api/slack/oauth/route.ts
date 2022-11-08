import { NextRequest } from "next/server";

const SLACK_CLIENT_ID = "1949106774466.5559259320660";
const SLACK_OAUTH_URL = "https://slack.com/api/oauth.v2.access";
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { code, redirectUri } = await request.json();

  try {
    const res = await fetch(SLACK_OAUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${code}&client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&redirect_uri=${redirectUri}`,
    });
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
