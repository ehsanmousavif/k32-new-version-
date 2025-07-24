"use client";

import React, { createContext, useState } from "react";

import CardEntry from "./card-entry";
import SelectSlug from "./select-slug";
import CardPreview from "./card-preview";

import ProgressBar from "@/components/progress";
import { ValidatedCard } from "@/generated/prisma";
import { noSSR } from "next/dynamic";

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
  const [validated, setValidated] = useState<Pick<
    ValidatedCard,
    "iban" | "cardNumber" | "ownerName"
  > | null>(null);

  async function getAllData() {
    const res = await fetch("/api/internal/get-all-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const __data = res.json();

    if (!__data) {
      return console.log("شماره کارت رو وارد نکردی", __data);
    }

    return console.log("محتوای شما", __data);
  }

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
      // مرحله 1: بررسی validated-card
      const res = await fetch("/api/internal/validated-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardNumber: cardData }),
      });

      let validatedData = null;

      try {
        validatedData = await res.json();
      } catch (error) {
        console.warn("⚠️ داده‌ای از سرور برنگشت یا JSON خراب بود");
      }

      if (res.ok && validatedData?.cardNumber) {
        console.log("✅ کارت در validated پیدا شد:", validatedData);
        return validatedData;
      } else {
        // مرحله 2: اگر نبود، رفتن به سمت API فیک
        console.warn("❌ کارت در validated پیدا نشد، رفتیم سراغ fake-card");

        const fallbackRes = await fetch("/api/internal/get-all-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const fakeData = await fallbackRes.json();

        if (fallbackRes.ok) {
          console.log("🟡 کارت فیک دریافت شد:", fakeData);
          return fakeData;
        } else {
          console.error("❌ خطا در دریافت کارت فیک:", fakeData);
        }
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
              {changPage === "card-entry" && (
                <CardEntry
                  fetchValidatedCard={fetchValidatedCard}
                  sendData={sendData}
                />
              )}
              {changPage === "create-card" && (
                <CardPreview validated={validated} />
              )}

              {changPage === "slug" && <SelectSlug />}
            </CardDataContext.Provider>
          </PageContext.Provider>
        </div>
      </div>
    </ProgressContext.Provider>
  );
}
