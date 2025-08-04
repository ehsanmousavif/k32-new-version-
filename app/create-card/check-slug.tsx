import { Input } from "@heroui/input";
import React, { useContext, useState } from "react";
import { Button } from "@heroui/button";

import { CardDataContext, validatedResponseContext } from "./page";

import { checkSlugResponseContext, PageContext } from "./page";
export default function Slug() {
  const CardNumberContext = useContext(CardDataContext);

  const pageContext = useContext(PageContext);

  const [inputValue, setInputValue] = useState("");

  const sharedContext = useContext(validatedResponseContext);
  const checkSlugContext = useContext(checkSlugResponseContext);

  if (!checkSlugContext || !pageContext || !CardNumberContext) return null;
  const { cardData, setCardData } = CardNumberContext;
  const { checkSlug, setCheckSlug } = checkSlugContext;
  const { setChangePage } = pageContext;

  if (!sharedContext || !checkSlugContext) return null;

  const { shareData } = sharedContext;

  async function getSlug() {
    if (!shareData?.iban || !shareData?.ownerName || !cardData || !inputValue) {
      console.warn("⚠️ مقادیر ناقص یا خالی هستند");
      return;
    }

    try {
      const res = await fetch("/api/internal/check-slug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: inputValue,
          cardNumber: cardData,
          iban: shareData.iban,
          ownerName: shareData.ownerName,
        }),
      });

      const response = await res.json();

      if (res.ok) {
        console.log("✅ نام کاربری ثبت نشده است:", response);

        setCheckSlug(response.user.slug);
        setChangePage("final-card");
      } else {
        console.warn("⚠️ خطا یا تکراری بودن:", response.error);
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
