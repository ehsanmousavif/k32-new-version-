"use client";

import { useEffect, useState } from "react";

import { Card } from "@/generated/prisma";
import { timeAgo } from "@/lib/times";
import { FetchingData } from "@/lib/fetching-data";

export default function Profile() {
  const [userData, setUserData] = useState<Card>();
  const fetchFirstCard = async () => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      console.warn("❗ توکن وجود ندارد");

      return;
    }

    try {
      const { data }: any = await FetchingData({
        endpoint: "/api/internal/user-data",
        requiresAuth: true,
      });

      console.log(data.data);
      setUserData(data.data);
      if (!data.ok) {
        console.warn("⚠️ خطا در گرفتن کارت:", data.error || data.message);

        return;
      }
    } catch (err) {
      console.error("⛔ خطا در ارتباط با سرور:", err);
    }
  };

  useEffect(() => {
    fetchFirstCard();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4 font-vazir">
      <span className="font-vazir text-black">پروفایل</span>
      <div className="flex flex-col items-center">
        <span className="font-vazir text-xl text-black">
          {userData?.fullName} :نام و نام خانودگی شما
        </span>
        <span className="font-vazir text-xl text-black">
          ثبت نام کردی: {timeAgo(userData?.createdAt || "")}
        </span>
        {userData?.disabled == true ? (
          <span className="text-red-200">کارت فعال نیست</span>
        ) : (
          <span className="text-green-500">کارت فعال است</span>
        )}
      </div>
    </div>
  );
}
