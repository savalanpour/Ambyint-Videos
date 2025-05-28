"use client";

import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { MovieImage } from "@/services/types";
import { getMovieImages } from "@/services/movie-details-service";

import "react-image-gallery/styles/css/image-gallery.css";

interface Props {
  id: number;
}

export function MovieImages({ id }: Props) {
  const [images, setImages] = useState<MovieImage[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchImages = async () => {
      try {
        const data = await getMovieImages(id);
        if (!isMounted) return;
        setImages(data.backdrops || []);
      } catch (err) {
        if (!isMounted) return;
        console.error(err);
      } finally {
        if (!isMounted) return;
      }
    };

    fetchImages();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (images.length === 0) {
    return <p className="text-center py-8">No images available.</p>;
  }

  return (
    <div className=" mt-20 py-2">
      <h2 className="max-w-7xl mx-auto text-2xl font-semibold mb-4">
        Movie Stills
      </h2>
      <div className="max-w-5xl mx-auto my-8 p-4 rounded-lg shadow-lg">
        <div className="">
          <ImageGallery
            items={images.map((image) => ({
              original: `https://image.tmdb.org/t/p/w500${image.file_path}`,
              thumbnail: `https://image.tmdb.org/t/p/w200${image.file_path}`,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
