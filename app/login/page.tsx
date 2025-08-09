"use client";

import { Prisma, User } from "@/generated/prisma";
import { FetchingData } from "@/lib/fetching-data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function checkTokenAndGetUser() {
    const { data }: any = await FetchingData<
      Prisma.UserGetPayload<{ select: { password: true; userName: true } }>
    >({
      endpoint: "/api/internal/auth/login",
      body: { userName: userName, password: password },
      requiresAuth: false,
    });

    if (!data) {
      return console.log("ورود موفقیت آمیز نبود", data.error);
    } else {
      console.log("ورود موفقیت آمیز بود ", data);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
      <input
        className="border border-gray-300 rounded px-3 py-2"
        placeholder="نام کاربری"
        type="text"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded px-3 py-2"
        placeholder="رمز عبور"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white py-2 rounded"
        onClick={() => {
          checkTokenAndGetUser(), router.push("/create-card");
        }}
      >
        بررسی و دریافت اطلاعات
      </button>
    </div>
  );
}
