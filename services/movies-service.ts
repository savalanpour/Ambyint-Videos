import { apiServer } from "@/utils/api-server";
import { LatestMoviesResponse, MovieDetails, MovieCredits } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getLatestMovies(page: number) {
  return apiServer<LatestMoviesResponse>(
    `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
  );
}

export async function getMovieDetails(id: string) {
  return apiServer<MovieDetails>(
    `/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
}

export async function getMovieCredits(id: string) {
  return apiServer<MovieCredits>(
    `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
}
