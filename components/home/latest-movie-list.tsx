"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input, Spin } from "antd";

import { Movie } from "@/services/types";
import { getLatestMovies } from "@/services/movies-service";
import { debounce } from "@/utils";
import { MovieCard } from "@/components/home/movie-card";
import { NotFoundMovie } from "@/components/home/not-found-movie";

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

  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(page < initialTotalPages);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

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

  const debouncedPush = useMemo(
    () =>
      debounce((value: string) => {
        setLoading(true);
        setHasMore(true);
        router.push(`/?query=${encodeURIComponent(value)}`);
        getLatestMovies(page, value).then((data) => {
          setMovies(data.results);
          if (1 >= data.total_pages) {
            setHasMore(false);
          }
          setLoading(false);
        });
      }, 500),
    [router, page]
  );

  useEffect(() => {
    return () => {
      debouncedPush.cancel();
    };
  }, [debouncedPush]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedPush(value);
  };

  return (
    <div className="min-h-96">
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
      {movies.length === 0 && !loading && <NotFoundMovie query={query} />}
      <Spin
        spinning={loading}
        tip="Loading..."
        className="bg-black opacity-50 min-h-96"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 min-h-96">
          {/* TODO: Some movies are returned multiple times with the same id, causing duplicate-key errors. This must be resolved on the API/service side to guarantee unique ids, rather than patching it in the frontend. */}
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
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
    </div>
  );
}
