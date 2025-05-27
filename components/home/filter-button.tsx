import React from "react";
import clsx from "clsx";

interface FilterButtonProps {
  setFilter: (filter: string) => void;
  activeFilter: string;
}

const FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: "Now Playing", value: "now_playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

export function FilterButton({
  setFilter,
  activeFilter = "now_playing",
}: FilterButtonProps) {
  return (
    <div
      role="group"
      className="flex items-center border border-orange-600 overflow-hidden rounded-md h-8 mb-6 mr-3"
    >
      {FILTER_OPTIONS.map((filterOption, idx) => {
        const isActive = activeFilter === filterOption.value;
        return (
          <button
            key={filterOption.value}
            type="button"
            onClick={() => setFilter(filterOption.value)}
            className={clsx(
              "flex items-center justify-center px-4 text-sm h-full",
              isActive
                ? "bg-orange-900 text-white"
                : "text-orange-700 hover:bg-gray-800",
              idx > 0 && "border-l border-orange-700"
            )}
          >
            {filterOption.label}
          </button>
        );
      })}
    </div>
  );
}
