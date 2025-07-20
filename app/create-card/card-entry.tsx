"use client";

import { Button, InputOtp } from "@heroui/react";
import React, { useContext, useState } from "react";

import { ProgressContext } from "./page";
import { PageContext } from "./page";
import { checkCardsContext } from "./page";

import { Card } from "@/generated/prisma";

export default function CardEntry() {
  const [cardData, setCardData] = useState<Card["cardNumber"]>("");

  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const checkContext = useContext(checkCardsContext);

  if (!ProContext || !pageContext || !checkContext) return null;

  const { setProgress } = ProContext;
  const { setCheckCard } = checkContext;

  const sendData = async () => {
    try {
      const res = await fetch("/api/internal/check-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: cardData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ کارت ثبت نشده. ادامه بده", data);
        setCheckCard(cardData);
      } else {
        console.log("⚠️ شماره کارت قبلا ثبت شده است ", data);
      }
    } catch (error) {
      console.error("خطا:", error);
      alert("مشکلی پیش آمده.");
    }
  };

  return (
    <div className="w-auto">
      <div className="w-full m-auto h-60 flex flex-col items-center justify-between gap-4">
        <span className="font-normal">شماره کارت خود را وارد کنید</span>
        <InputOtp
          className="m-auto"
          errorMessage={"شماره کارت شما باید ۱۶ رقم باشد"}
          isInvalid={cardData.length !== 16}
          length={16}
          size="sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCardData(e.target.value)
          }
        />
      </div>
      <Button
        fullWidth
        className="font-vazir"
        color="primary"
        isDisabled={cardData.length !== 16}
        radius="full"
        size="md"
        onPress={() => {
          sendData();
          setProgress("60");
        }}
      >
        تایید
      </Button>
    </div>
  );
}
