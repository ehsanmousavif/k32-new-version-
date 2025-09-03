"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";

import { FetchingData } from "@/lib/fetching-data";
import CardBank from "@/components/card";
import { Card } from "@/generated/prisma";

export default function Cards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const data = await FetchingData<unknown, Card>({
        endpoint: "/api/internal/cards/cards",
        requiresAuth: true,
      });

      if (!data.ok) {
        console.warn("⚠️ خطا در گرفتن کارت:", data.message);
        console.warn("⚠️ داده‌ای دریافت نشد");
        setLoading(false);
        return;
      }
      if (data.ok && data) {
        console.log("✅ کارت‌ها دریافت شدند:", data.data);
        setCards([data.data]);
      }
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
    return (
      <div className="w-[22rem] flex flex-col h-screen justify-center items-center gap-6 p-6">
        <span>هیچ کارتی ثبت نشده است </span>
        <Button className="w-full bg-primary" href="/create-card">
          ثبت کارت جدید
        </Button>
      </div>
    );
  }

  return (
    <div className="flex m-auto flex-col gap-4 w-[22rem]">
      {cards.map((card) => (
        <CardBank
          key={card.cardNumber}
          iban={card.iban}
          name={card.fullName}
          number={card.cardNumber}
        />
      ))}
    </div>
  );
}
