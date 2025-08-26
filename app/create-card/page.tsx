"use client";

import React, { createContext, useState } from "react";
import { addToast, Button } from "@heroui/react";

import CardEntry from "./card-entry";
import Slug from "./check-slug";
import CardPreview from "./card-preview";

import { FetchingData } from "@/lib/fetching-data";
import ProgressBar from "@/components/progress";
import { Card, Prisma, ValidatedCard } from "@/generated/prisma";
import { useSignOut } from "@/lib/signout";

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

type PageType = "card-preview" | "card-entry" | "slug";

export default function CreateCard() {
  const [changPage, setChangePage] = useState<PageType>("card-entry");
  const [progress, setProgress] = useState("30");
  const [cardNumberData, setCardNumberData] = useState<string | null>(null);
  const signOut = useSignOut();
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
      setChangePage("card-entry");
      setProgress("30");
      addToast({
        color: "danger",
        timeout: 3000,
        description: " کارت قبلا ثبت شده است",
      });
    } else {
      console.log("✅ حله", error);
    }
  };

  const fetchValidatedCard = async () => {
    if (!cardNumberData) {
      addToast({
        color: "danger",
        timeout: 3000,
        description: "وارد کردن شماره کارت الزامی است",
      });

      return;
    }

    const { data } = await FetchingData<
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
        setShareData(data);
        console.log("✅بیو", data);
      } else {
        addToast({
          color: "success",
          timeout: 3000,
          description: "شماره کارت با موفقیت ثبت شد",
        });
        console.warn("❌ نه");
      }
    } catch (error) {
      console.error("⛔ خطا در عملیات:", error);
    }
  };

  return (
    <div className=" w-[25rem] max-w-2xl">
      <Button onPress={signOut} className="">
        خروج
      </Button>
      <ProgressContext.Provider value={{ progress, setProgress }}>
        <div className="w-full font-vazir">
          <div className="w-auto flex flex-col items-center gap-4">
            <div className="w-2/3 mx-4">
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
                  </checkSlugResponseContext.Provider>
                </validatedResponseContext.Provider>
              </CardDataContext.Provider>
            </PageContext.Provider>
          </div>
        </div>
      </ProgressContext.Provider>
    </div>
  );
}
