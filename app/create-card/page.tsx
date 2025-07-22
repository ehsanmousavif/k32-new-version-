"use client";

import React, { createContext, useState } from "react";

import CardEntry from "./card-entry";
import CardDetails from "./CardDetails";
import SelectSlug from "./select-slug";

import ProgressBar from "@/components/progress";

export const ProgressContext = createContext<{
  progress: string;
  setProgress: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const PageContext = createContext<{
  changPage: PageType;
  setChangePage: React.Dispatch<React.SetStateAction<PageType>>;
} | null>(null);

export const CardDataContext = createContext<{
  cardData: string | null;
  setCardData: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export const ValidatedCardContext = createContext<{
  validatedData: any;
  setValidatedData: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

type PageType = "create-card" | "card-entry" | "slug";

export default function CreateCard() {
  const [changPage, setChangePage] = useState<PageType>("card-entry");
  const [progress, setProgress] = useState("30");
  const [cardData, setCardData] = useState<string | null>(null);

  const sendData = async () => {
    try {
      const res = await fetch("/api/internal/check-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardNumber: cardData }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ کارت ثبت نشده. ادامه بده", data);
      } else {
        console.log("⚠️ شماره کارت قبلا ثبت شده است ", data);
      }
    } catch (error) {
      console.error("خطا:", error);
      alert("مشکلی پیش آمده.");
    }
  };

  const fetchValidatedCard = async () => {
    if (!cardData) return;
    try {
      const res = await fetch("/api/internal/validated-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardNumber: cardData }),
      });

      const _data = await res.json();
      if (res.ok && cardData) {
        console.log("✅ اطلاعات کارت:", _data);
      } else {
        console.warn("خطا در دریافت یا ساخت کارت:", _data);
      }
    } catch {
      console.error("ریدی");
    }
    console.log("🧪 داده نهایی برای کارت:", cardData);
  };

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      <div className="w-full font-vazir">
        <div className="w-auto flex flex-col items-center gap-4">
          <div className="w-full">
            <ProgressBar progressPercent={progress} value={96} />
          </div>
          <PageContext.Provider value={{ changPage, setChangePage }}>
            <CardDataContext.Provider value={{ cardData, setCardData }}>
              {changPage === "card-entry" && <CardEntry sendData={sendData} />}
              {changPage === "create-card" && (
                <CardDetails fetchValidatedCard={fetchValidatedCard} />
              )}
              {changPage === "slug" && <SelectSlug />}
            </CardDataContext.Provider>
          </PageContext.Provider>
        </div>
      </div>
    </ProgressContext.Provider>
  );
}
