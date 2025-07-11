import { apiServer } from "@/utils/api-server";
import { LatestMoviesResponse } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getLatestMovies(
  page: number,
  type: string = "now_playing",
  query?: string
) {
  const endpoint =
    query && query.trim() !== ""
      ? `/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=${page}`
      : `/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`;

  return apiServer<LatestMoviesResponse>(endpoint);
}
