"use client";
import React from "react";

export default function LoginButton() {
  const handleLogin = async () => {
    console.log("Login");
  };

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-600 transition cursor-pointer"
    >
      Login
    </button>
  );
}
