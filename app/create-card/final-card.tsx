"use client";

import React, { useContext } from "react";

import { validatedResponseContext } from "./page";
import { checkSlugResponseContext } from "./page";

interface Props {
  getData: () => void;
}

export default function FinalSubmitButton({ getData }: Props) {
  const slugContext = useContext(checkSlugResponseContext); // شامل slug
  const sharedContext = useContext(validatedResponseContext);

  if (!sharedContext || !slugContext) return null;

  const { shareData } = sharedContext;

  const handleSubmit = async () => {
    if (!shareData?.cardNumber || !shareData?.iban || !shareData?.ownerName) {
      console.error("⚠️ اطلاعات ناقص است!");

      return;
    }

    try {
      const res = await fetch("/api/internal/finalized-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: shareData?.cardNumber,
          iban: shareData?.iban,
          ownerName: shareData?.ownerName,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("✅ ارسال موفق:", result);
      } else {
        console.warn("⚠️ خطا در ارسال:", result.error || result);
      }
    } catch (error) {
      console.error("⛔ خطای ارتباط با سرور:", error);
    }
  };

  // console.log(
  //   shareData?.cardNumber,
  //   shareData?.iban,
  //   shareData?.ownerName,
  //   slug
  // );

  return (
    <>
      <span>
        برای ثبت نهایی کارد اینجا کلیککنید Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Facilis, dolor alias? Tempore, in. Quaerat
        minima sapiente cupiditate. Tempore, veniam? Ut at eligendi
        necessitatibus dolor rem sequi modi, eius unde doloribus?
      </span>
      <button
        className="bg-black text-white py-2 px-4 rounded-lg"
        onClick={() => {
          handleSubmit;
          getData;
        }}
      >
        ثبت نهایی کارت
      </button>
    </>
  );
}
