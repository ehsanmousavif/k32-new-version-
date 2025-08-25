"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublicRoute =
      pathname === "/create-card" ||
      pathname === "/signin" ||
      pathname === "/signup";

    if (!isPublicRoute) {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/signin");
      }
    } else {
    }
  }, [pathname, router]);

  return <>{children}</>;
}
