"use client";
import React from "react";
import { useTmdbAuth } from "@/hooks/use-tmdb-auth";

export default function LoginButton() {
  const { login } = useTmdbAuth();

  return (
    <button
      onClick={login}
      className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-600 transition cursor-pointer"
    >
      Login
    </button>
  );
}
