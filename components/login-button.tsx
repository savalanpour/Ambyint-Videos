"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useTmdbAuth } from "@/hooks/use-tmdb-auth";
import { CircleUser, ChevronDown } from "lucide-react";
import { Dropdown, MenuProps } from "antd";
import { getCookie, logOut } from "@/utils";
import Link from "next/link";
import Image from "next/image";

interface UserInfo {
  username: string | null;
  avatarPath: string | null;
}

const avatarUrl = "https://www.gravatar.com/avatar";

export default function LoginButton() {
  const { login } = useTmdbAuth();
  const [user, setUser] = useState<UserInfo>({
    username: null,
    avatarPath: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const sessionId = getCookie("session_id");
    const username = getCookie("username") || null;
    const avatarPath = getCookie("avatar_path") || null;
    setIsLoggedIn(!!sessionId);
    setUser({ username, avatarPath });
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    logOut();
  };

  const menuItems: MenuProps["items"] = useMemo(
    () => [
      { key: "watchlist", label: <Link href="/watch-list">Watchlist</Link> },
      { key: "logout", label: <a onClick={handleLogout}>Logout</a> },
    ],
    []
  );

  if (isLoading) {
    return <div className="w-8 h-2" />;
  }

  if (!isLoggedIn) {
    return (
      <button
        onClick={login}
        className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
      >
        Login
      </button>
    );
  }

  const avatarSrc = user.avatarPath
    ? `${avatarUrl}/${user.avatarPath}?s=200&d=identicon`
    : null;

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottom"
      trigger={["click"]}
      arrow
    >
      <button className="flex items-center gap-2 text-gray-300 focus:outline-none">
        {user.username}
        <ChevronDown size={16} />
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <CircleUser size={30} />
        )}
      </button>
    </Dropdown>
  );
}
