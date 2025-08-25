"use client";

import { useState, useEffect } from "react";

import { FetchingData } from "@/lib/fetching-data";
import CardBank from "@/components/card";

export default function Cards() {
  const [showCard, setShowCard] = useState<any | null>(null);

  type CardResponse = {
    cardNumber: string;
    fullName: string;
    iban: string;
    card: string;
  };

  const fetchFirstCard = async () => {
    try {
      const { data, error } = await FetchingData<undefined, CardResponse>({
        endpoint: "/api/internal/get-data",
        requiresAuth: true,
      });

      if (error) {
        console.warn("⚠️ خطا در گرفتن کارت:", error);

        return;
      }

      if (!data) {
        console.warn("⚠️ داده‌ای دریافت نشد");

        return;
      }

      console.log("✅ کارت دریافت شد:", data.card);
      console.log(data.cardNumber);
      console.log(data.iban);
      console.log(data.fullName);

      setShowCard(data);
    } catch (err) {
      console.error("⛔ خطا در ارتباط با سرور:", err);
    }
  };

  useEffect(() => {
    fetchFirstCard();
  }, []);

  if (!showCard) {
    return <p>در حال دریافت کارت...</p>;
  }

  return (
    <div className="w-[22rem]">
      {" "}
      <CardBank
      
        iban={showCard.iban}
        number={showCard.cardNumber}
        name={showCard.fullName}
      />
    </div>
  );
}
