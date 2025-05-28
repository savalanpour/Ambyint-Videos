"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/components/home/movie-card";
import { getCookie } from "@/utils";
import { Movie } from "@/services/types";
import { getWatchlist } from "@/services/watch-list-service";

const WatchlistPage: React.FC = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const sessionId = getCookie("session_id") || "";
    const accountId = getCookie("account_id") || "";
    if (!sessionId) {
      router.push("/");
      return;
    }

    (async () => {
      try {
        const data = await getWatchlist(accountId, sessionId);
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to load watchlist:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center px-6 py-12 bg-black text-white min-h-screen">
        Loading your watchlist...
      </div>
    );
  }

  return (
    <main className="px-6 py-12 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>
        {movies.length === 0 ? (
          <p className="text-gray-400">You haven’t added any movies yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} isInWatchlist={true} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default WatchlistPage;
