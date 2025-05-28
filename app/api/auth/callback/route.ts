import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const request_token = url.searchParams.get("request_token");
  const approved = url.searchParams.get("approved");

  if (!request_token || approved !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
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

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("session_id", session_id, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
