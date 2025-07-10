// card-entry.tsx
"use client";

import { InputOtp } from "@heroui/react";
import React, { useContext } from "react";
import { CardContext } from "./page";

export default function CardEntry() {
  const context = useContext(CardContext);

  if (!context) throw new Error("CardContext must be used within a Provider");

  const { cardValue, setCardValue } = context;

  return (
    <div className="w-auto">
      <div className="w-full m-auto h-60 flex flex-col items-center justify-between gap-4">
        <span>Enter your card number</span>
        <InputOtp
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCardValue(e.target.value)
          }
          className="m-auto"
          length={16}
          size="sm"
          value={cardValue}
        />
      </div>
    </div>
  );
}
