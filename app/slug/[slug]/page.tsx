"use client";

import React, { useEffect, useState } from "react";

import { FetchingData } from "@/lib/fetching-data";
import { Card, Prisma } from "@/generated/prisma";
import CardBank from "@/components/card";

export default function CardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const [returnData, setReturnData] = useState<Prisma.CardGetPayload<{
    select: { cardNumber: true; fullName: true; iban: true };
  }> | null>(null);

  const _X = async () => {
    const data = await FetchingData<unknown, Card>({
      endpoint: "/api/internal/cards/slug",
      body: { slug },
      requiresAuth: false,
    });

    if (data.ok) {
      setReturnData(data.data);
      console.log(data);
    }
  };

  useEffect(() => {
    _X();
  }, [slug]);

  return (
    <div className="  p-4 text-black w-full max-w-2xl">
      <div className="w-80 m-auto">
        <CardBank
          iban={returnData?.iban || ""}
          name={returnData?.fullName}
          number={returnData?.cardNumber || ""}
        />
      </div>
    </div>
  );
}
