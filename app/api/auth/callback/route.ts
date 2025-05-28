import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const request_token = url.searchParams.get("request_token");
  const approved = url.searchParams.get("approved");

  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const origin = `${protocol}://${host}`;

  if (!request_token || approved !== "true") {
    return NextResponse.redirect(new URL("/", origin));
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/authentication/session/new?` +
      `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_token }),
    }
  );
  const { session_id } = await res.json();

  const accountRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/account?` +
      `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
      `&session_id=${session_id}`
  );
  const accountData = await accountRes.json();
  const account_id = accountData.id;
  const username = accountData.username;
  const avatar_path = accountData.avatar?.gravatar?.hash;

  const response = NextResponse.redirect(new URL("/", origin));
  response.cookies.set("session_id", session_id);
  response.cookies.set("account_id", String(account_id));
  response.cookies.set("username", String(username));
  response.cookies.set("avatar_path", String(avatar_path));
  return response;
}
