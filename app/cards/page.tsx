"use client";

import { useState, useEffect } from "react";
import { FetchingData } from "@/lib/fetching-data";
import CardBank from "@/components/card";

type CardResponse = {
  cardNumber: string;
  fullName: string;
  iban: string;
};

type APIResponse = {
  message: string;
  token: string;
  cards: CardResponse[];
};

export default function Cards() {
  const [cards, setCards] = useState<CardResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const { data, error } = await FetchingData<undefined, APIResponse>({
        endpoint: "/api/internal/get-data",
        requiresAuth: true,
      });

      if (error) {
        console.warn("⚠️ خطا در گرفتن کارت:", error);
        setLoading(false);
        return;
      }

      if (!data || !data.cards || data.cards.length === 0) {
        console.warn("⚠️ داده‌ای دریافت نشد");
        setLoading(false);
        return;
      }

      console.log("✅ کارت‌ها دریافت شدند:", data.cards);
      setCards(data.cards);
    } catch (err) {
      console.error("⛔ خطا در ارتباط با سرور:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) {
    return <p>در حال دریافت کارت‌ها...</p>;
  }

  if (cards.length === 0) {
    return <p>هیچ کارتی ثبت نشده است.</p>;
  }

  return (
    <div className="flex  m-auto flex-col gap-4 w-[22rem]">
      {cards.map((card) => (
        <CardBank
          key={card.cardNumber}
          number={card.cardNumber}
          name={card.fullName}
          iban={card.iban}
        />
      ))}
    </div>
  );
}
