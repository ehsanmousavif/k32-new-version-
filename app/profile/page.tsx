"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Card } from "@/generated/prisma";
import { timeAgo } from "@/lib/times";
import { FetchingData } from "@/lib/fetching-data";
import { Icon } from "@/components/icons/icons";

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
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {" "}
      <div className="BASE_CONTAINER h-80">
        <div className="text-md text-white flex items-center gap-2 ">
          {Icon.save}
          <span> نام و نام خانوادگی شما :</span>

          <span className="text-sm font-bold">{userData?.fullName}</span>
        </div>
        <div className="text-md text-white flex items-center gap-2 ">
          {Icon.data}
          <span> ثبت نام کردی:</span>

          <span className="text-sm font-bold">
            {timeAgo(userData?.createdAt || "")}
          </span>
        </div>

        {userData?.disabled ? (
          <span className="text-red-400 font-semibold">کارت فعال نیست</span>
        ) : (
          <span className="text-green-400 font-semibold">کارت فعال است</span>
        )}
      </div>
    </motion.div>
  );
}
