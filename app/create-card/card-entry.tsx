"use client";

import { Button, InputOtp } from "@heroui/react";
import React, { useContext } from "react";

import { ProgressContext, PageContext, CardDataContext } from "./page";
("./card-preview");

interface Functions {
  sendData: () => any;
  fetchValidatedCard: () => any;
}

export default function CardEntry({ sendData, fetchValidatedCard }: Functions) {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const CardNumberContext = useContext(CardDataContext);

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
          value={cardData ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCardData(e.target.value)
          }
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
          fetchValidatedCard();
          setProgress("60");
          setChangePage("card-preview");
        }}
      >
        تایید
      </Button>
    </div>
  );
}
