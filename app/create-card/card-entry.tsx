"use client";

import { Button, InputOtp } from "@heroui/react";
import React, { useContext } from "react";

import { ProgressContext, PageContext, CardDataContext } from "./page";

interface Functions {
  sendData: () => any;
}

export default function CardEntry({ sendData }: Functions) {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const CardNumberContext = useContext(CardDataContext);

  // اینجا مقدارهای کانتکست گرفته شده رو چک می‌کنیم
  if (!ProContext || !pageContext || !CardNumberContext) return null;

  const { cardData, setCardData } = CardNumberContext;
  const { setProgress } = ProContext;
  const { setChangePage } = pageContext;

  return (
    <div className="w-auto">
      <div className="w-full m-auto h-60 flex flex-col items-center justify-between gap-4">
        <span className="font-normal">شماره کارت خود را وارد کنید</span>
        <InputOtp
          className="m-auto"
          errorMessage={"شماره کارت شما باید ۱۶ رقم باشد"}
          isInvalid={!cardData || cardData.length !== 16}
          length={16}
          size="sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCardData(e.target.value)
          }
          value={cardData ?? ""}
        />
      </div>
      <Button
        fullWidth
        className="font-vazir"
        color="primary"
        isDisabled={!cardData || cardData.length !== 16}
        radius="full"
        size="md"
        onPress={() => {
          sendData();
          setProgress("60");
          setChangePage("create-card");
        }}
      >
        تایید
      </Button>
    </div>
  );
}
  