"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RateCount } from "@/components/common/rate-count";
import { ReleaseDate } from "@/components/common/release-date";
import { Movie } from "@/services/types";
import DefaultImage from "@/public/images/default-image.png";
import { getCookie } from "@/utils";
import { WatchlistButton } from "@/components/common/watchlist-button";

interface MovieCardProps {
  movie: Movie;
  isInWatchlist?: boolean;
}

export function MovieCard({ movie, isInWatchlist = false }: MovieCardProps) {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = getCookie("session_id");
    const accountId = getCookie("account_id");
    if (sessionId) {
      setSessionId(sessionId);
    }
    if (accountId) {
      setAccountId(accountId);
    }
  }, []);

  return (
    <div className="relative group">
      <Link href={`/movie/${movie.id}`} className="block hover:text-gray-100">
        <div data-testid="movie-card" className="movie-card">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : DefaultImage
            }
            alt={movie.title}
            width={290}
            height={290}
            className="w-full h-auto mb-2 min-h-[342px] bg-gray-500"
          />
          <h2 className="text-md font-semibold line-clamp-1 hover:text-gray-100">
            {movie.title}
          </h2>
          <div className="flex mt-2">
            <span className="flex-1">
              <RateCount rate={movie.vote_average} count={movie.vote_count} />
            </span>
            <ReleaseDate date={movie.release_date} />
          </div>
        </div>
      </Link>
      {sessionId && accountId && (
        <WatchlistButton
          movieId={movie.id}
          initialInWatchlist={isInWatchlist}
        />
      )}
    </div>
  );
}
