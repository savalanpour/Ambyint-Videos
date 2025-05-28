"use client";

import React, { MouseEvent, useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { message } from "antd";
import { updateWatchlist } from "@/services/watch-list-service";
import { getCookie } from "@/utils";

interface WatchlistButtonProps {
  movieId: number;
  initialInWatchlist?: boolean;
  className?: string;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  movieId,
  initialInWatchlist = false,
  className = "",
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    // TODO: On mount, fetch the user's watchlist and, if this movieId is included,
    //  set `inWatchlist` to true so the button renders as “selected.”
    setSessionId(getCookie("session_id"));
    setAccountId(getCookie("account_id"));
  }, []);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    if (!sessionId || !accountId) {
      messageApi.open({
        type: "error",
        content: "You must be logged in to add to your watchlist",
        key: "watchlist-error",
      });
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      await updateWatchlist(accountId, sessionId, movieId, !inWatchlist);
      setInWatchlist(!inWatchlist);
      messageApi.open({
        type: "success",
        content: inWatchlist
          ? "Removed from your watchlist"
          : "Added to your watchlist",
        key: "watchlist-success",
      });
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: "error",
        content: "Failed to update watchlist",
        key: "watchlist-error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <button
        onClick={handleClick}
        disabled={loading}
        className={`absolute top-3 right-3 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition ${className}`}
      >
        <Heart
          size={20}
          className={inWatchlist ? "text-red-500" : "text-white"}
        />
      </button>
    </>
  );
};
