import { apiServer } from "@/utils/api-server";
import { MovieCredits, MovieDetails, MovieImages } from "@/services/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

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
