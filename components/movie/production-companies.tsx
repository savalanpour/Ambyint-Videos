import React from "react";
import Image from "next/image";
import { Company } from "@/services/types";

interface Props {
  companies: Company[];
}

export function ProductionCompanies({ companies }: Props) {
  return (
    <div className="mt-12 max-w-7xl mx-auto flex flex-col gap-6 px-4 md:px-0">
      <h2 className="text-2xl font-semibold mb-4">Production Companies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex flex-col h- items-center justify-center bg-gray-300 p-4 rounded-lg"
          >
            {company.logo_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w185${company.logo_path}`}
                alt={company.name}
                width={100}
                height={50}
                className="object-contain mb-2"
              />
            ) : (
              <div className="h-12 flex items-center justify-center mb-2 text-xs text-gray-400">
                No Logo
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
