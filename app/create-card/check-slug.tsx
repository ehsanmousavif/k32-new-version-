"use client";
import { useState, useEffect, useContext } from "react";
import { Input } from "@heroui/input";
import { Button, addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

import { CardContext } from "@/components/CardProvider";
import { useDebounce } from "@/lib/useDebounce";
import { FetchingData } from "@/lib/fetching-data";
import { Icon } from "@/components/icons/icons";
import { Card } from "@/generated/prisma";

export default function Slug() {
  const context = useContext(CardContext);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const debouncedInput = useDebounce(inputValue, 500);

  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [latestResult, setLatestResult] = useState<Card | null>(null);

  useEffect(() => {
    const checkSlug = async () => {
      if (!debouncedInput || debouncedInput.length < 4) return;
      if (!shareData?.iban || !shareData?.ownerName || !cardNumberData) return;

      setIsChecking(true);
      try {
        const response = await FetchingData<unknown, Card>({
          endpoint: "/api/internal/cards/create-card",
          body: {
            slug: debouncedInput,
            cardNumber: shareData.cardNumber,
            iban: shareData.iban,
            ownerName: shareData.ownerName,
          },
          requiresAuth: true,
        });

        if (response.ok) {
          setLatestResult(response.data);
          setIsDuplicate(false);
          addToast({ color: "success", description: "دامنه معتبر است" });
        } else {
          setIsDuplicate(true);
          addToast({ color: "danger", description: "دامنه تکراری است" });
        }
      } catch (err: any) {
        if (err?.status === 409) {
          setIsDuplicate(true);
          addToast({ color: "danger", description: "دامنه تکراری است" });
        } else {
          console.error("⛔ error:", err);
          setIsDuplicate(true);
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkSlug();
  }, [debouncedInput]);
  if (!context) return null;

  const { cardNumberData, shareData, setChangePage } = context;

  const handleSubmit = async () => {
    if (!inputValue || inputValue.length < 4) {
      addToast({ color: "danger", description: "دامنه نامعتبر است" });

      return;
    }

    if (!shareData || !cardNumberData) return;

    if (isDuplicate) {
      addToast({ color: "danger", description: "دامنه تکراری است" });

      return;
    }

    try {
      const ok = latestResult?.slug;

      if (ok) {
        addToast({ color: "success", description: "کارت با موفقیت ثبت شد" });
        router.push("/cards");
      } else {
        addToast({ color: "danger", description: "دامنه تکراری است" });
        setChangePage("slug");
      }
    } catch (err) {
      console.error("error for record your slug", err);
      addToast({ color: "danger", description: "خطا در ثبت دامنه" });
    }
  };

  return (
    <div className="CREATE_CARDS_CONTAINER">
      {Icon.earth}
      <div className="w-full min-h-[10vh] flex flex-col items-center justify-center gap-4">
        <span className="text-medium text-center">
          دامنه مورد نظر خود را وارد نمایید
        </span>
        <span className="text-medium text-center">
          از دامنه برای اشتراک گذاری کارت استفاده خواهد شد
        </span>
      </div>

      <Input
        className="w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <span className="text-medium text-[12px] text-red-500">
          لطفا حداقل 4 کاراکتر وارد کنید
        </span>
        <span className="text-medium text-[12px] text-red-500">
          تنها حروف انگلیسی یا اعداد مجاز هستند
        </span>
        <span className="text-medium text-[12px] text-red-500">
          حداکثر طول نام کاربری 16 رقم است
        </span>
        {isDuplicate && (
          <span className="text-medium text-[12px] text-red-500">
            دامنه معتبر نیست
          </span>
        )}
      </div>

      <div className="w-full flex items-center gap-2">
        <Button
          className="w-full"
          color="primary"
          isDisabled={isChecking || !inputValue || inputValue.length < 4}
          radius="sm"
          onPress={handleSubmit}
        >
          {isChecking ? "در حال بررسی..." : "بعدی"}
        </Button>
      </div>
    </div>
  );
}
