import { apiServer } from "@/utils/api-server";
import {
  LatestMoviesResponse,
  MovieDetails,
  MovieCredits,
  MovieImages,
} from "./types";

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

export async function getMovieImages(id: number) {
  return apiServer<MovieImages>(
    `/movie/${id}/images?api_key=${API_KEY}&language=null`
  );
}
