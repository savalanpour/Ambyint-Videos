import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const request_token = url.searchParams.get("request_token");
  const approved = url.searchParams.get("approved");

  if (!request_token || approved !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const res = await fetch(
    `${API_URL}/authentication/session/new?api_key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_token }),
    }
  );
  const { session_id } = await res.json();

  const accountRes = await fetch(
    `${API_URL}/account?api_key=${API_KEY}&session_id=${session_id}`
  );
  const accountData = await accountRes.json();
  const account_id = accountData.id;
  const username = accountData.username;
  const avatar_path = accountData.avatar?.gravatar?.hash;

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("session_id", session_id);
  response.cookies.set("account_id", String(account_id));
  response.cookies.set("username", String(username));
  response.cookies.set("avatar_path", String(avatar_path));
  return response;
}
