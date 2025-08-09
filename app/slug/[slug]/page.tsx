"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import { FetchingData } from "@/lib/fetching-data";

interface dataType {}

export default function CardPage({ params }: { params: { slug: string } }) {
  const [returnData, setReturnData] = useState<any>("");
  const _X = async () => {
    const { data }: any = await FetchingData({
      endpoint: "/api/internal/get-card-by-slug",
      body: { slug: params.slug },
      requiresAuth: true,
    });

    setReturnData(data);
    console.log(data);
  };

  useEffect(() => {
    _X();
  }, [params.slug]);

  return (
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold">{returnData.ownerName}</h1>{" "}
      <p>شماره کارت: {returnData.cardNumber}</p>
    </div>
  );
}
