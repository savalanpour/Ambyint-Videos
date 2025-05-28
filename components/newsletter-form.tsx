"use client";

import React, {useState} from "react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    console.log(e)
    setEmail("");
  };
  return (
  <form onSubmit={handleSubmit} className="flex items-center gap-4 md:justify-end">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="max-w-sm flex-1 rounded-lg bg-white px-4 py-3 text-black"
      required
    />
    <button
      type="submit"
      className="rounded-lg bg-gray-800 px-6 py-3 text-white transition-colors hover:bg-gray-700"
    >
      Get Started
    </button>
  </form>
  );
}