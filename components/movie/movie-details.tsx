"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReleaseDate } from "@/components/common/release-date";
import { RateCount } from "@/components/common/rate-count";
import { MovieDetails as DetailsType } from "@/services/types";
import {
  ArrowBigLeft,
  CircleDollarSign,
  Clapperboard,
  Hourglass,
  Languages,
} from "lucide-react";
import { formatMinutesToHours, formatToUSD } from "@/utils";
import DefaultImage from "@/public/images/default-image.png";

interface Props {
  details: DetailsType;
}

export function MovieDetails({ details }: Props) {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <Image
          src={
            details.poster_path
              ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
              : DefaultImage
          }
          alt={details.title}
          width={500}
          height={750}
          className="rounded-md shadow-lg border border-gray-800 bg-gray-500"
        />
      </div>

      <div className="w-full md:w-2/3 space-y-6 relative">
        <div className="flex justify-between items-center border-b border-gray-600 pb-4">
          <h1 className="text-4xl font-bold flex-1">{details.title}</h1>
          <span
            onClick={() => router.push("/")}
            className="flex items-center border border-orange-500 text-sm px-4 py-2 rounded-md cursor-pointer"
          >
            <ArrowBigLeft />
            Back
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <RateCount rate={details.vote_average} count={details.vote_count} />
          <ReleaseDate date={details.release_date} />
        </div>
        <p className="text-lg leading-relaxed">{details.overview}</p>
        <div className="absolute bottom-0 left-0 right-0 pt-4">
          <p className="leading-relaxed text-sm mb-6 flex items-center">
            <span className="text-white flex items-center mr-2">
              <Hourglass className="mr-2 text-orange-500" width="16" />
              Duration:{" "}
            </span>
            <span className="text-gray-300">
              {formatMinutesToHours(details.runtime)}
            </span>
          </p>
          <p className="leading-relaxed flex items-center text-sm mb-6">
            <span className="text-white flex items-center">
              <Clapperboard className="mr-2 text-orange-500" width="16" />{" "}
              Genres:{" "}
            </span>
            {details.genres.map((genre) => (
              <span
                key={genre.id}
                className="border flex items-center bg-[#442006] border-orange-500 rounded-xl px-2 py-1 text-gray-300 text-sm ml-2"
              >
                {genre.name}
              </span>
            ))}
          </p>
          <p className="leading-relaxed text-sm mb-6 flex items-center">
            <span className="text-white flex items-center mr-2">
              <Languages className="mr-2 text-orange-500" width="16" />
              Original Language:{" "}
            </span>
            <span className="text-gray-300">
              {details.original_language.toUpperCase()}
            </span>
          </p>
          <p className="leading-relaxed text-sm mb-6 flex items-center">
            <span className="text-white flex items-center mr-2">
              <CircleDollarSign className="mr-2 text-orange-500" width="16" />
              Budget:{" "}
            </span>
            <span className="text-gray-300">{formatToUSD(details.budget)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
