// CreateCard.tsx
"use client";

import ProgressBar from "@/components/progress";
import { Button } from "@heroui/react";
import CardEntry from "./card-entry";

import { createContext, useState } from "react";

export const CardContext = createContext<{
  cardValue: string;
  setCardValue: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export default function CreateCard() {
  const [cardValue, setCardValue] = useState("");

  return (
    <CardContext.Provider value={{ cardValue, setCardValue }}>
      <div className="w-full ">
        <div className="w-auto flex flex-col items-center gap-4">
          <div className="w-full">
            <ProgressBar bgColor="red-500" value={96} />
          </div>
          <CardEntry />
          <Button
            radius="full"
            color="primary"
            isDisabled={cardValue.length !== 16}
          >
            submit
          </Button>
        </div>
      </div>
    </CardContext.Provider>
  );
}
