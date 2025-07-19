"use client";

import { Button, InputOtp } from "@heroui/react";
import React, { useContext, useState } from "react";

import { ProgressContext } from "./page";
import { PageContext } from "./page";
import { Card, User } from "@/generated/prisma";

export default function CardEntry() {
  const [cardData, setCardData] = useState<Card["cardNumber"]>();
  const [userName, setuserName] = useState<User["username"]>("");
  const [fullName, setFullName] = useState("");

  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);

  if (!ProContext || !pageContext) return null;

  const { setProgress } = ProContext;
  const { setChangePage } = pageContext;

  const sendData = async () => {
    try {
      const res = await fetch("/api/internal/cards", {
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
        console.log("کارت پیدا شد:", data);
        setFullName(data.user.fullName); // 👈 اینجا مقدار رو می‌ریزیم تو state
        alert(`کاربر پیدا شد: ${data.user.fullName}`);
      } else {
        alert("کارت یافت نشد.");
      }
    } catch (error) {
      console.error("خطا:", error);
      alert("مشکلی پیش آمده.");
    }
  };

  return (
    <div className="w-auto">
      <span className="text-black"> {fullName}</span>
      <div className="w-full m-auto h-60 flex flex-col items-center justify-between gap-4">
        <span className="font-normal">شماره کارت خود را وارد کنید</span>
        <InputOtp
          isInvalid
          className="m-auto"
          errorMessage={"شماره کارت شما باید حداقل 16 رقم باشد"}
          length={16}
          size="sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCardData(e.target.value)
          }
        />
        {userName}
      </div>
      <Button
        className="font-vazir "
        color="primary"
        fullWidth={true}
        radius="full"
        size="md"
        onPress={() => {
          // setChangePage("create-card");
          setProgress("60");
          sendData();
        }}
      >
        تایید
      </Button>
    </div>
  );
}
