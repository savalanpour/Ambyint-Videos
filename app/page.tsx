import React from "react";
import { getLatestMovies } from "@/services/movies-service";
import Image from "next/image";
import { ReleaseDate } from "@/components/ui-elements/release-date";
import { RateCount } from "@/components/ui-elements/rate-count";

export default async function Home() {
  const latestMovies = await getLatestMovies(1);
  return (
    <main className="flex flex-col items-center justify-center py-4 bg-black text-white">
      <div className="container max-w-7xl">
        <h1 className="w-full text-3xl font-bold mb-4 text-left">
          Latest Videos
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {latestMovies?.results?.map((movie) => (
            <div
              key={movie.id}
              className="border border-orange-100 rounded-md shadow p-2"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto mb-2"
                width={290}
                height={290}
              />
              <h2 className="text-md font-semibold line-clamp-1">
                {movie.title}
              </h2>
              <div className="flex mt-2">
                <RateCount rate={movie.vote_average} count={movie.vote_count} />
                <ReleaseDate date={movie.release_date} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
