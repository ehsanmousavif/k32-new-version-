"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface props {
  token: string | null;
}
export function TokenValidated(token: string|null) {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (token == null) {
      router.push("/login");

      return console.log("ثبت نام نکردی");
    } else {
      return console.log("ریدی");
    }
  }, [pathName, router]);
}
