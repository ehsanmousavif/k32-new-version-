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
    <div className="BASE_CONTAINER w-[25rem] flex flex-col items-center justify-center gap-6 font-vazir text-right">
      <span className="text-lg font-bold text-white">پروفایل</span>

      <div className="flex flex-col items-start gap-3 w-full">
        <span className="text-md text-white">
          نام و نام خانوادگی شما :
          <span className="text-sm font-bold">{userData?.fullName}</span>
        </span>
        <span className="text-md text-white">
          ثبت نام کردی:
          <span className="text-sm font-bold">
            {" "}
            {timeAgo(userData?.createdAt || "")}
          </span>
        </span>

        {userData?.disabled ? (
          <span className="text-red-400 font-semibold">کارت فعال نیست</span>
        ) : (
          <span className="text-green-400 font-semibold">کارت فعال است</span>
        )}
      </div>
    </div>
  );
}
