import React from "react";

export function NotFoundMovie({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] bg-black text-gray-400 py-60">
      <svg
        className="w-16 h-16 mb-4 animate-pulse text-gray-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 4.35 4.35a7.5 7.5 0 0 0 12.3 12.3z"
        />
      </svg>
      <p className="flex text-center text-lg">
        We couldn’t find any titles matching{" "}
        <span className="font-medium text-white ml-2"> {query} </span>.
      </p>
      <p className="mt-2 text-sm">
        Try searching with different keywords, or check your spelling.
      </p>
    </div>
  );
}
