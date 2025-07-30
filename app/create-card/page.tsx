"use client";

import React, { createContext, useState } from "react";

import CardEntry from "./card-entry";
import Slug from "./check-slug";
import CardPreview from "./card-preview";
import FinalCard from "./final-card";

import ProgressBar from "@/components/progress";
import { User, ValidatedCard } from "@/generated/prisma";

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

export const validatedResponseContext = createContext<{
  shareData: Pick<ValidatedCard, "cardNumber" | "iban" | "ownerName"> | null;
  setShareData: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);
export const checkSlugResponseContext = createContext<{
  checkSlug: Pick<User, "slug"> | null;
  setCheckSlug: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

type PageType = "card-preview" | "card-entry" | "slug" | "final-card";

export default function CreateCard() {
  const [changPage, setChangePage] = useState<PageType>("card-entry");
  const [progress, setProgress] = useState("30");
  const [cardData, setCardData] = useState<string | null>(null);
  const [shareData, setShareData] = useState<Pick<
    ValidatedCard,
    "cardNumber" | "iban" | "ownerName"
  > | null>(null);
  const [checkSlug, setCheckSlug] = useState<Pick<User, "slug"> | null>(null);
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
    if (!cardData) {
      console.warn("شماره کارت وارد نشده");

      return;
    }

    try {
      const res = await fetch("/api/internal/validated-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber: cardData }),
      });

      let validatedData = null;

      try {
        validatedData = await res.json();
      } catch {
        console.warn("⚠️ داده‌ای از سرور برنگشت یا JSON خراب بود");
      }

      if (res.ok && validatedData?.cardNumber) {
        setShareData(validatedData);
      } else {
        console.warn("❌ کارت در validated پیدا نشد، رفتیم سراغ fake-card");
      }
    } catch (error) {
      console.error("⛔ خطا در عملیات:", error);
    }
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
              <validatedResponseContext.Provider
                value={{ shareData, setShareData }}
              >
                <checkSlugResponseContext.Provider
                  value={{ checkSlug, setCheckSlug }}
                >
                  {changPage === "card-entry" && (
                    <CardEntry
                      fetchValidatedCard={fetchValidatedCard}
                      sendData={sendData}
                    />
                  )}
                  {changPage === "card-preview" && <CardPreview />}
                  {changPage === "slug" && <Slug />}
                  {changPage === "final-card" && <FinalCard />}
                </checkSlugResponseContext.Provider>
              </validatedResponseContext.Provider>
            </CardDataContext.Provider>
          </PageContext.Provider>
        </div>
      </div>
    </ProgressContext.Provider>
  );
}
