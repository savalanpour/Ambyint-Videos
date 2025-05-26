"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ReleaseDate } from "@/components/ui-elements/release-date";
import { RateCount } from "@/components/ui-elements/rate-count";
import { Movie } from "@/services/types";
import Link from "next/link";
import { getLatestMovies } from "@/services/movies-service";
import { Input, Spin } from "antd";

interface Props {
  initialMovies: Movie[];
  initialTotalPages: number;
  initialQuery: string;
}

const { Search } = Input;

export function LatestMovieList({
  initialMovies,
  initialTotalPages,
  initialQuery,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(page < initialTotalPages);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qp = searchParams.get("query") || "";
    setLoading(true);
    setQuery(qp);
    setPage(1);
    getLatestMovies(1, qp).then((data) => {
      setMovies(data.results);
      if (1 >= data.total_pages) {
        setHasMore(false);
      }
      setLoading(false);
    });
  }, [searchParams]);

  const loadMore = async () => {
    const nextPage = page + 1;
    getLatestMovies(nextPage, query).then((data) => {
      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
      if (nextPage >= data.total_pages) {
        setHasMore(false);
      }
    });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    router.push(`/?query=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="w-full flex-1 text-3xl font-bold mb-4 text-left">
          Latest Videos
        </h1>
        <Search
          placeholder="Search movies..."
          value={query}
          onChange={onSearchChange}
          className="mb-6 w-96"
        />
      </div>
      <Spin spinning={loading} tip="Loading..." className="bg-black opacity-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
              <div
                data-testid="movie-card"
                key={movie.id}
                className="border border-gray-500 rounded-md shadow p-2"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={290}
                  height={290}
                  className="w-full h-auto mb-2 min-h-[342px] bg-gray-800"
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
      </Spin>
    </>
  );
}
