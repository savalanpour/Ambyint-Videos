import { apiServer } from "@/utils/api-server";
import { LatestMoviesResponse } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getLatestMovies(page: number) {
  return apiServer<LatestMoviesResponse>(
    `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
  );
}
