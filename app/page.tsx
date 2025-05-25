import React from "react";
import { getLatestMovies } from "@/services/movies-service";
import {LatestMovieList} from "@/components/home/latest-movie-list";

export default async function Home() {
  const latestMovies = await getLatestMovies(1);
  return (
    <main className="flex flex-col items-center justify-center py-4 bg-black text-white">
      <div className="container max-w-7xl">
        <h1 className="w-full text-3xl font-bold mb-4 text-left">
          Latest Videos
        </h1>
        <LatestMovieList initialMovies={latestMovies.results} totalPages={latestMovies.total_pages} />
      </div>
    </main>
  );
}
