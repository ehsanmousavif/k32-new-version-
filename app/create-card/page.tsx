"use client";

import React, { createContext, useState } from "react";

import CardEntry from "./card-entry";
import Slug from "./check-slug";
import CardPreview from "./card-preview";
import FinalCard from "./final-card";

import { FetchingData } from "@/lib/fetching-data";
import ProgressBar from "@/components/progress";
import { Card, Prisma, ValidatedCard } from "@/generated/prisma";

export const ProgressContext = createContext<{
  progress: string;
  setProgress: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const PageContext = createContext<{
  changPage: PageType;
  setChangePage: React.Dispatch<React.SetStateAction<PageType>>;
} | null>(null);

export const CardDataContext = createContext<{
  cardNumberData: string | null;
  setCardNumberData: React.Dispatch<React.SetStateAction<string | null>>;
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
  checkSlug: Pick<Card, "slug"> | null;
  setCheckSlug: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);
export const getDataContext = createContext<{
  getData: any;
  setGetData: any;
} | null>(null);

type PageType = "card-preview" | "card-entry" | "slug" | "final-card";

interface authFunction {
  sedAuthData: () => void;
}

export default function CreateCard({ sedAuthData }: authFunction) {
  const [changPage, setChangePage] = useState<PageType>("card-entry");
  const [progress, setProgress] = useState("30");
  const [cardNumberData, setCardNumberData] = useState<string | null>(null);
  const [shareData, setShareData] = useState<Pick<
    ValidatedCard,
    "cardNumber" | "iban" | "ownerName"
  > | null>(null);
  const [checkSlug, setCheckSlug] = useState<Pick<Card, "slug"> | null>(null);
  const sendData = async () => {
    const { data, error } = await FetchingData({
      endpoint: "/api/internal/check-card",
      body: { cardNumber: cardNumberData },
      requiresAuth: true,
    });

    if (data) {
      console.log("درسته", data);
    } else if (!data) {
      console.log("⚠️ این کارت قبلاً ثبت شده");
    } else {
      console.log("✅ ریدی", error);
    }
  };

  const fetchValidatedCard = async () => {
    if (!cardNumberData) {
      console.warn("شماره کارت وارد نشده");

      return;
    }

    const { data, error } = await FetchingData<
      { cardNumber: string },
      Prisma.ValidatedCardGetPayload<{
        select: { cardNumber: true; iban: true; ownerName: true };
      }>
    >({
      endpoint: "/api/internal/validated-card",
      body: { cardNumber: cardNumberData },
      requiresAuth: true,
    });

    try {
      if (data?.cardNumber) {
        setShareData(data); // این‌جا set می‌کنی
        console.log("✅ داده‌ی ولید شده:", data); // مستقیماً data رو لاگ کن، نه shareData
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
            <CardDataContext.Provider
              value={{ cardNumberData, setCardNumberData }}
            >
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
                  {changPage === "final-card" && (
                    <FinalCard sedAuthData={sedAuthData} />
                  )}
                </checkSlugResponseContext.Provider>
              </validatedResponseContext.Provider>
            </CardDataContext.Provider>
          </PageContext.Provider>
        </div>
      </div>
    </ProgressContext.Provider>
  );
}
