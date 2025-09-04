"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FetchingData } from "./fetching-data";

import { User } from "@/generated/prisma";

interface TokenExpiredProps {
  children: ReactNode;
}

export function TokenExpired({ children }: TokenExpiredProps) {
  const [user, setUser] = useState<User | null>(null);

  const fetcher = async () => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      console.error("There is no token ");

      return;
    }

    try {
      const data = await FetchingData<User, any>({
        endpoint: "/api/internal/user/user",
        requiresAuth: true,
      });

      if (data.ok) {
        console.log(data.data);
        setUser(data.data.user);
      }
      if (!data.ok) {
        console.warn("error in get card", data.message || data.message);

        return;
      }
    } catch (err) {
      console.error("⛔ error for connection to server ", err);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  const [valid, setValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user?.expiresAt) return;

    const now = new Date();
    const expires = new Date(user.expiresAt);

    const expireThreshold = new Date(
      expires.getTime() + 15 * 24 * 60 * 60 * 1000
    );

    if (now >= expireThreshold) {
      localStorage.removeItem("auth-token");
      setValid(false);

      router.push("/signup");
    }
  }, [user?.expiresAt, router]);

  if (!valid) {
    return null;
  }

  return <>{children}</>;
}
