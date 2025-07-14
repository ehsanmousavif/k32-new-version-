// card-entry.tsx
"use client";

import { Button, InputOtp } from "@heroui/react";
import React, { useContext, useState } from "react";

import { ProgressContext } from "./page";
import { PageContext } from "./page";

interface valuetypes {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function CardEntry() {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  if (!ProContext || !pageContext) return null; // چک کردن هر دو context

  const { progress, setProgress } = ProContext;
  const { changPage, setChangePage } = pageContext;

  return (
    <div className="w-auto">
      <div className="w-full m-auto h-60 flex flex-col items-center justify-between gap-4">
        <span className="font-normal">شماره کارت خود را وارد کنید</span>
        <InputOtp
          isInvalid
          errorMessage={"شماره کارت شما باید حداقل 16 رقم باشد"}
          className="m-auto"
          length={16}
          size="sm"
        />
      </div>
      <Button
        className="font-vazir "
        color="primary"
        fullWidth={true}
        radius="full"
        size="md"
        onPress={() => {
          setChangePage("create-card");
          setProgress("60");
        }}
      >
        تایید
      </Button>
    </div>
  );
}
