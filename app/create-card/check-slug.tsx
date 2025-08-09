import { Input } from "@heroui/input";
import React, { useContext, useState } from "react";
import { Button } from "@heroui/button";

import { CardDataContext, validatedResponseContext } from "./page";
import { checkSlugResponseContext, PageContext } from "./page";

import { FetchingData } from "@/lib/fetching-data";
export default function Slug() {
  const CardNumberContext = useContext(CardDataContext);

  const pageContext = useContext(PageContext);

  const [inputValue, setInputValue] = useState("");

  const sharedContext = useContext(validatedResponseContext);
  const checkSlugContext = useContext(checkSlugResponseContext);

  if (!checkSlugContext || !pageContext || !CardNumberContext) return null;
  const { cardNumberData, setCardNumberData } = CardNumberContext;
  const { checkSlug, setCheckSlug } = checkSlugContext;
  const { setChangePage } = pageContext;

  if (!sharedContext || !checkSlugContext) return null;

  const { shareData } = sharedContext;

  async function getSlug() {
    if (
      !shareData?.iban ||
      !shareData?.ownerName ||
      !cardNumberData ||
      !inputValue
    ) {
      console.warn("⚠️ مقادیر ناقص یا خالی هستند");

      return;
    }

    try {
      // const res = await fetch("/api/internal/check-slug", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({

      //   }),
      // });
      type dataTypes = {
        slug: string;
        cardNumber: string;
        iban: string;
        ownerName: string;
      };

      const { data, error }: any = await FetchingData<dataTypes>({
        endpoint: "/api/internal/check-slug",
        body: {
          slug: inputValue,
          cardNumber: shareData.cardNumber,
          iban: shareData.iban,
          ownerName: shareData.ownerName,
        },
        requiresAuth: true,
      });

      if (data.ok) {
        console.log("✅ نام کاربری ثبت نشده است:", data);

        setChangePage("final-card");
      } else {
        console.warn("⚠️ خطا یا تکراری بودن:", data.error);
      }
    } catch (err) {
      console.error("⛔ خطا در برقراری ارتباط با سرور:", err);
    }
  }

  return (
    <div>
      <Input
        className="w-56"
        onChange={async (e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        className="w-56 bg-black mt-64"
        onPress={() => {
          getSlug();
          setChangePage("final-card");
        }}
      >
        بعدی{" "}
      </Button>
    </div>
  );
}
