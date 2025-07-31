"use client";

import { useContext, useEffect, useState } from "react";
import { CardDataContext, validatedResponseContext } from "../create-card/page";

export default function Cards() {
  const CardNumberContext = useContext(CardDataContext);
  const [data, setData] = useState<any | null>(null);
  const dataContext = useContext(validatedResponseContext);
  if (!CardNumberContext) return null;

  const { cardData, setCardData } = CardNumberContext;
  if (!dataContext) return null;

  return (
    <div>
      <div className="flex flex-col items-center text-black">{data.iban}</div>
    </div>
  );
}
