"use client";

import React from "react";
import { addToast } from "@heroui/react";

import CardEntry from "./card-entry";
import Slug from "./check-slug";
import CardPreview from "./card-preview";

import { FetchingData } from "@/lib/fetching-data";
import ProgressBar from "@/components/progress";
import { Prisma } from "@/generated/prisma";
import { CardProvider, CardContext } from "@/components/CardProvider";

export default function CreateCard() {
  return (
    <CardProvider>
      <CardContext.Consumer>
        {(context) => {
          if (!context) return null;
          const {
            progress,
            setProgress,
            changePage,
            setChangePage,
            cardNumberData,
            setShareData,
          } = context;

          const sendData = async () => {
            const { data, error } = await FetchingData({
              endpoint: "/api/internal/cards/check-card",
              body: {
                cardNumber: cardNumberData,
              },
              requiresAuth: true,
            });

            if (data) {
              console.log("data is available", data);
            } else if (!data) {
              console.log("card added!");
              setChangePage("card-entry");
              setProgress("30");
              addToast({
                color: "danger",
                description: " کارت قبلا ثبت شده است",
              });
            } else {
              console.log("✅ ok", error);
            }
          };

          const fetchValidatedCard = async () => {
            if (!cardNumberData) {
              addToast({
                color: "danger",
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
              endpoint: "/api/internal/cards/validated-card",
              body: { cardNumber: cardNumberData },
              requiresAuth: true,
            });

            try {
              if (data?.cardNumber) {
                setShareData(data);
                console.log("data", data);
              } else {
                addToast({
                  color: "success",
                  description: "شماره کارت ثبت نشده ادامه بده",
                });
                console.warn("❌ نه");
              }
            } catch (error) {
              console.error("⛔ خطا در عملیات:", error);
            }
          };

          return (
            <div className="w-[23rem] max-w-2xl ">
              <div className="w-full font-vazir">
                <div className="w-auto flex flex-col items-center gap-4">
                  <div className="w-5/6 mx-4">
                    <ProgressBar progressPercent={progress} value={96} />
                  </div>
                  {changePage === "card-entry" && (
                    <CardEntry
                      fetchValidatedCard={fetchValidatedCard}
                      sendData={sendData}
                    />
                  )}
                  {changePage === "card-preview" && <CardPreview />}
                  {changePage === "slug" && <Slug />}
                </div>
              </div>
            </div>
          );
        }}
      </CardContext.Consumer>
    </CardProvider>
  );
}
