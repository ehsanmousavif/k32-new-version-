"use client";

import React, { useContext } from "react";

import { validatedResponseContext } from "./page";
import { checkSlugResponseContext } from "./page";

interface authFunction {
  sedAuthData: () => void;
}

export default function FinalSubmitButton({ sedAuthData }: authFunction) {
  const slugContext = useContext(checkSlugResponseContext);

  // const handleSubmit = async () => {
  //   if (!shareData?.cardNumber || !shareData?.iban || !shareData?.ownerName) {
  //     console.error("⚠️ اطلاعات ناقص است!");

  //     return;
  //   }
  //   const token = localStorage.getItem("auth-token");

  //   try {
  //     const res = await fetch("/api/internal/finalized-card", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         cardNumber: shareData?.cardNumber,
  //         iban: shareData?.iban,
  //         ownerName: shareData?.ownerName,
  //         token,
  //       }),
  //     });

  //     const result = await res.json();

  //     if (res.ok) {
  //       console.log("✅ ارسال موفق:", result);
  //     } else {
  //       console.warn("⚠️ خطا در ارسال:", result.error || result);
  //     }
  //   } catch (error) {
  //     console.error("⛔ خطای ارتباط با سرور:", error);
  //   }
  // };

  // console.log(
  //   shareData?.cardNumber,
  //   shareData?.iban,
  //   shareData?.ownerName,
  //   slug
  // );

  return (
    <>
      <span className="text-black font-vazir text-xl">
        می‌توانید در هر زمان اطلاعات کارت خود را مشاهده یا ویرایش کنید. برای
        افزودن کارت جدید یا بازگشت به داشبورد، از منوی بالا استفاده کنید.
      </span>
      {}
      <button
        className="bg-black text-white py-2 px-4 rounded-lg"
        onClick={sedAuthData}
      >
        ثبت نهایی کارت
      </button>
    </>
  );
}
