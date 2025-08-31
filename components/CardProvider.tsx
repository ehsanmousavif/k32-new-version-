"use client";

import React, { createContext, useState, ReactNode } from "react";

import { Card, ValidatedCard } from "@/generated/prisma";

export type PageType = "card-preview" | "card-entry" | "slug";

type CardContextType = {
  progress: string;
  setProgress: React.Dispatch<React.SetStateAction<string>>;
  changePage: PageType;
  setChangePage: React.Dispatch<React.SetStateAction<PageType>>;
  cardNumberData: string | null;
  setCardNumberData: React.Dispatch<React.SetStateAction<string | null>>;
  shareData: Pick<ValidatedCard, "cardNumber" | "iban" | "ownerName"> | null;
  setShareData: React.Dispatch<
    React.SetStateAction<Pick<
      ValidatedCard,
      "cardNumber" | "iban" | "ownerName"
    > | null>
  >;
  checkSlug: Pick<Card, "slug"> | null;
  setCheckSlug: React.Dispatch<React.SetStateAction<Pick<Card, "slug"> | null>>;
};

export const CardContext = createContext<CardContextType | null>(null);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState("30");
  const [changePage, setChangePage] = useState<PageType>("card-entry");
  const [cardNumberData, setCardNumberData] = useState<string | null>(null);
  const [shareData, setShareData] = useState<Pick<
    ValidatedCard,
    "cardNumber" | "iban" | "ownerName"
  > | null>(null);
  const [checkSlug, setCheckSlug] = useState<Pick<Card, "slug"> | null>(null);

  return (
    <CardContext.Provider
      value={{
        progress,
        setProgress,
        changePage,
        setChangePage,
        cardNumberData,
        setCardNumberData,
        shareData,
        setShareData,
        checkSlug,
        setCheckSlug,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
