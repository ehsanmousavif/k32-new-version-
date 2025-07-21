import React, { useContext, useState } from "react";
import { Button } from "@heroui/button";

import { ProgressContext, PageContext } from "./page";
import { checkCardsContext } from "./page";

import CardBank from "@/components/card";
import { ValidatedCard } from "@/generated/prisma";

export default function CardDetails() {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const checkContext = useContext(checkCardsContext);

  // State برای ذخیره داده واکشی شده
  const [validatedData, setValidatedData] = useState<ValidatedCard | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!ProContext || !pageContext || !checkContext) return null;
  const { setProgress } = ProContext;
  const { setChangePage } = pageContext;
  const { checkCard } = checkContext;

  const fetchValidatedCard = async () => {
    if (!checkCard) {
      setError("شماره کارت موجود نیست.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/internal/validated-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: checkCard,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ اطلاعات کارت:", data);
        setValidatedData(data);
      } else {
        console.warn("خطا در دریافت یا ساخت کارت:", data);
        setError(data.error || "خطا در دریافت اطلاعات");
      }
    } catch (error) {
      console.error("⛔ خطای واکشی:", error);
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full" />
      {/* کارت اصلی با شماره کارت */}

      {/* نمایش اطلاعات واکشی شده */}

      {/* نمایش خطا */}
      {error && <p className="text-red-600 mt-2 font-bold">{error}</p>}

      <Button
        className="font-vazir mt-8"
        color="primary"
        fullWidth={true}
        radius="full"
        size="md"
        onPress={async () => {
          // اول اطلاعات رو واکشی کن
          await fetchValidatedCard();

          // بعد به صفحه بعد برو و پروگرس رو کامل کن
          setChangePage("slug");
          setProgress("100");
        }}
        disabled={loading}
      >
        {loading ? "در حال بررسی..." : "تایید"}
      </Button>
      {validatedData && (
        <CardBank
          iban={validatedData.iban}
          name={validatedData.ownerName}
          number={validatedData.cardNumber}
        />
      )}
    </div>
  );
}
