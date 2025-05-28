import React from "react";
import Image from "next/image";
import { CastMember } from "@/services/types";
import DefaultAvatar from "@/public/images/default-avatar.png";

interface Props {
  cast: CastMember[];
}

export function TopActors({ cast }: Props) {
  return (
    <div className="max-w-7xl mx-auto my-8 px-4 md:px-0">
      <h2 className="text-2xl font-semibold mb-4">Top Actors</h2>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-6">
        {cast.map((actor) => (
          <div
            key={actor.cast_id}
            className="flex flex-col items-center p-4 rounded-lg"
          >
            <Image
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : DefaultAvatar
              }
              alt={actor.name}
              width={100}
              height={100}
              className="rounded-full object-cover min-h-[150px] bg-white"
            />
            <span className="mt-2 text-sm font-medium text-center">
              {actor.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
