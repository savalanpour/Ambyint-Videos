import React from "react";
import { Film } from "lucide-react";

export default function AboutUs() {
  return (
    <main className="px-8 py-20 bg-black text-gray-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="shadow-lg p-8">
          <div className="flex items-center space-x-4">
            <Film size={48} />
            <h1 className="text-3xl font-bold">About Ambyint-Videos</h1>
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-lg leading-relaxed">
              At Ambyint-Videos, our mission is to connect movie lovers with the
              perfect film. Whether you’re exploring in-depth reviews, checking
              ratings, or building your personalized watchlist, our platform
              brings everything you need into one place.
            </p>
            <h2 className="text-2xl font-semibold">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Comprehensive movie search and details</li>
              <li>Real-time ratings and reviews</li>
              <li>Actor & crew insights</li>
              <li>Filter movies by category</li>
              <li>Scrolling for more videos</li>
            </ul>
            <h2 className="text-2xl font-semibold">Our Tech Stack</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js & React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Ant Design components</li>
              <li>Lucide icons</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
