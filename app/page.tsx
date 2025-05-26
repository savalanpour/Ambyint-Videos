import React from "react";
import { getLatestMovies } from "@/services/movies-service";
import { LatestMovieList } from "@/components/home/latest-movie-list";

interface HomeProps {
  searchParams: { query?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const { query } = await searchParams;
  const latestMovies = await getLatestMovies(1, query);

  return (
    <main className="flex flex-col items-center justify-center py-4 bg-black text-white">
      <div className="container max-w-7xl">
        <LatestMovieList
          initialMovies={latestMovies.results}
          initialTotalPages={latestMovies.total_pages}
          initialQuery={query || ""}
        />
      </div>
    </main>
  );
}
