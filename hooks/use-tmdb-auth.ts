"use client";
import { useCallback } from "react";
import { loginService } from "@/services/auth-service";

export function useTmdbAuth() {
  const login = useCallback(async () => {
    const request_token = await loginService();

    window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}/api/auth/callback`;
  }, []);

  return { login };
}
