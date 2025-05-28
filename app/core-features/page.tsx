import React from "react";
import { Film } from "lucide-react";

export default function CoreFeatures() {
  return (
    <main className="px-1 md:px-8 py-20 bg-black text-gray-300">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="shadow-lg p-2 md:p-8 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <Film size={48} className="text-white" />
            <h1 className="text-3xl font-bold">
              Core Features of Ambyint-Videos
            </h1>
          </div>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Home Page</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Movie Listings</strong>: Browse lists of movies
                  fetched from TMDB.
                </li>
                <li>
                  <strong>Category Filters</strong>: Filter movies by category:
                  <ul className="list-disc list-inside ml-6 space-y-1">
                    <li>Now Playing</li>
                    <li>Popular</li>
                    <li>Top Rated</li>
                    <li>Upcoming</li>
                  </ul>
                </li>
                <li>
                  <strong>Movie Search</strong>: Quickly find any movie by
                  title.
                </li>
                <li>
                  <strong>Latest Movies</strong>: View the latest movies
                  released in theaters.
                </li>
                <li>
                  <strong>Movie Pagination</strong>: Navigate through multiple
                  pages of movie listings.
                </li>
                <li>
                  <strong>Responsive Design</strong>: Optimized for both mobile
                  and desktop devices.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                Movie Details Page
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Movie Details</strong>: View synopsis, ratings,
                  reviews, and full cast & crew.
                </li>
                <li>
                  <strong>Top Actors</strong>: See top-billed cast for each
                  film.
                </li>
                <li>
                  <strong>Production Companies</strong>: Discover studios behind
                  each movie.
                </li>
                <li>
                  <strong>Image Gallery</strong>: Browse stills and posters.
                </li>
                <li>
                  <strong>Responsive Design</strong>: Optimized for both mobile
                  and desktop devices.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Watchlist</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Save Movies</strong>: Add movies to your personal
                  watchlist.
                </li>
                <li>
                  <strong>Remove Movies</strong>: Easily remove movies from your
                  watchlist.
                </li>
                <li>
                  <strong>Persistent Storage</strong>: Watchlist saved in local
                  storage for future visits.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">
                User Authentication
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Login</strong>: Users can log in
                </li>
                <li>
                  <strong>User Avatar</strong>: Display user avatar in the
                  header
                </li>
                <li>
                  <strong>Register</strong>: New users can create an account.
                </li>
                <li>
                  <strong>Logout</strong>: Users can log out of their account.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
