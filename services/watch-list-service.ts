import { apiServer } from "@/utils/api-server";
import { LatestMoviesResponse, TMDBResponse } from "@/services/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getWatchlist(
  accountId: string,
  sessionId: string
): Promise<LatestMoviesResponse> {
  return apiServer<LatestMoviesResponse>(
    `/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`,
    { cache: "no-store" }
  );
}

export async function updateWatchlist(
  accountId: string,
  sessionId: string,
  movieId: number,
  watchlist: boolean = true
): Promise<TMDBResponse> {
  return apiServer<TMDBResponse>(
    `/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist,
      }),
    }
  );
}
