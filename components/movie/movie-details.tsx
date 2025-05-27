import React from "react";
import Image from "next/image";
import { ReleaseDate } from "@/components/common/release-date";
import { RateCount } from "@/components/common/rate-count";
import { MovieDetails as DetailsType } from "@/services/types";

interface Props {
  details: DetailsType;
}

export function MovieDetails({ details }: Props) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <Image
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
          width={500}
          height={750}
          className="rounded-md shadow-lg border border-gray-800"
        />
      </div>

      <div className="w-full md:w-2/3 space-y-6">
        <h1 className="text-4xl font-bold">{details.title}</h1>
        <div className="flex items-center space-x-6">
          <RateCount rate={details.vote_average} count={details.vote_count} />
          <ReleaseDate date={details.release_date} />
        </div>
        <p className="text-lg leading-relaxed">{details.overview}</p>
        <p className="leading-relaxed text-sm">
          <span className="text-white">Duration: </span>
          <span className="text-gray-300">{details.runtime} minutes</span>
        </p>
        <p className="leading-relaxed flex items-center text-sm">
          <span className="text-white">Genres: </span>
          {details.genres.map((genre) => (
            <span
              key={genre.id}
              className="border flex items-center bg-[#442006] border-orange-500 rounded-xl px-2 py-1 text-gray-300 text-sm ml-2"
            >
              {genre.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
