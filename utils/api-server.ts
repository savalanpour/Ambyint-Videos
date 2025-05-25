"use server";

type FetchOptions = RequestInit & {
  baseURL?: string;
  timeout?: number;
};

type ApiError = {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
  status?: number;
};

const DEFAULT_OPTIONS: FetchOptions = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 3000000,
};

async function handleApiResponse(response: Response) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    const errorData: ApiError = isJson
      ? await response.json()
      : { message: "An unexpected error occurred" };

    const error = new Error(
      errorData.message || "An unexpected error occurred"
    ) as Error & ApiError;
    error.status = response.status;
    error.code = errorData.code;
    error.errors = errorData.errors;

    throw error;
  }

  try {
    return isJson ? await response.json() : await response.text();
  } catch {
    throw new Error("Failed to parse response data");
  }
}

export async function apiServer<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const { baseURL, timeout, ...fetchOptions } = mergedOptions;

  const headers = new Headers(fetchOptions.headers);
  headers.set("Content-Type", "application/json");

  // Setup timeout with AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
      next: { revalidate: 0 }, // Disable cache by default for server components
    });

    const data = await handleApiResponse(response);
    return data as T;
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      // If it's our ApiError type, rethrow it
      if ("status" in error) {
        throw error;
      }

      // For network errors
      if (error.message === "Failed to fetch") {
        throw new Error("Network error - please check your connection");
      }

      throw error;
    }

    // For unknown errors
    throw new Error("An unexpected error occurred");
  } finally {
    clearTimeout(timeoutId);
  }
}
