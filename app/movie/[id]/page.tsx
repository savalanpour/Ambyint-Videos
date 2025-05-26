import React from "react";
import { getMovieDetails, getMovieCredits } from "@/services/movies-service";
import { MovieDetails } from "@/components/movie/movie-details";
import { TopActors } from "@/components/movie/top-actors";
import { ProductionCompanies } from "@/components/movie/production-companies";

interface Props {
  params: { id: string };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params; // We should use await here because : https://nextjs.org/docs/messages/sync-dynamic-apis

  const details = await getMovieDetails(id);
  const credits = await getMovieCredits(id);

  const topCast = credits.cast.slice(0, 10);

  return (
    <main className="px-6 py-8 bg-black text-white">
      <MovieDetails details={details} />
      <TopActors cast={topCast} />
      <ProductionCompanies companies={details.production_companies} />
    </main>
  );
}
