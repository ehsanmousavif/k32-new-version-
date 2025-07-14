// CreateCard.tsx
"use client";

import { Button } from "@heroui/react";
import React, { createContext, useState } from "react";

import CardEntry from "./card-entry";
import CardDetails from "./CardDetails";

import ProgressBar from "@/components/progress";
import SelectSlug from "./select-slug";

export const ProgressContext = createContext<{
  progress: string;
  setProgress: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);
export const PageContext = createContext<{
  changPage: PageType;
  setChangePage: React.Dispatch<React.SetStateAction<PageType>>;
} | null>(null);

type PageType = "create-card" | "card-entry" | "slug";
export default function CreateCard() {
  const [changPage, setChangePage] = useState<PageType>("card-entry");
  const [progress, setProgress] = useState("30");

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      <div className="w-full font-vazir ">
        <div className="w-auto flex flex-col items-center gap-4">
          <div className="w-full">
            <ProgressBar progressPercent={progress} value={96} />
          </div>
          <PageContext.Provider value={{ changPage, setChangePage }}>
            {changPage === "card-entry" && <CardEntry />}
            {changPage === "create-card" && <CardDetails />}
            {changPage === "slug" && <SelectSlug />}
          </PageContext.Provider>
        </div>
      </div>
    </ProgressContext.Provider>
  );
}
