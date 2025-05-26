"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ReleaseDate } from "@/components/ui-elements/release-date";
import { RateCount } from "@/components/ui-elements/rate-count";
import { Movie } from "@/services/types";
import Link from "next/link";

interface Props {
  initialMovies: Movie[];
  totalPages: number;
}

export function LatestMovieList({ initialMovies, totalPages }: Props) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(page < totalPages);

  const loadMore = async () => {
    const nextPage = page + 1;
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${nextPage}`
    );
    if (!res.ok) throw new Error("Failed to load more movies");
    const data = await res.json();
    setMovies((prev) => [...prev, ...data.results]);
    setPage(nextPage);
    if (nextPage >= data.total_pages) {
      setHasMore(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
            <div
              key={movie.id}
              className="border border-gray-500 rounded-md shadow p-2"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                width={290}
                height={290}
                className="w-full h-auto mb-2"
              />
              <h2 className="text-md font-semibold line-clamp-1">
                {movie.title}
              </h2>
              <div className="flex mt-2">
                <span className="flex flex-1">
                  <RateCount
                    rate={movie.vote_average}
                    count={movie.vote_count}
                  />
                </span>
                <ReleaseDate date={movie.release_date} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={loadMore}
            className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
