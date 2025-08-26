"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Icon } from "@/components/icons/icons";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isPublicRoute =
      pathname === "/create-card" ||
      pathname === "/signin" ||
      pathname === "/signup";

    if (isPublicRoute) {
      setAuthorized(true);
      setLoading(false);

      return;
    }

    const token = localStorage.getItem("auth-token");

    if (!token) {
      setAuthorized(false);
      router.replace("/signin");
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {Icon.loading}
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
