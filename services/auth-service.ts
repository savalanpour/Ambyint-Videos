const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginService() {
  const res = await fetch(
    `${API_URL}/authentication/token/new?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch request token");

  const { request_token } = await res.json();

  return request_token;
}
