import { Input } from "@heroui/input";
import React, { useContext, useState } from "react";
import { Button } from "@heroui/button";

import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

import {
  CardDataContext,
  ProgressContext,
  validatedResponseContext,
} from "./page";
import { checkSlugResponseContext, PageContext } from "./page";

import { FetchingData } from "@/lib/fetching-data";
import { Icon } from "@/components/icons/icons";
export default function Slug() {
  const router = useRouter();
  const [checkSlugExsisted, setCheckSlugExsisted] = useState<any>("");

  const CardNumberContext = useContext(CardDataContext);

  const pageContext = useContext(PageContext);

  const [inputValue, setInputValue] = useState("");

  const sharedContext = useContext(validatedResponseContext);
  const checkSlugContext = useContext(checkSlugResponseContext);
  const ProContext = useContext(ProgressContext);

  if (!checkSlugContext || !pageContext || !CardNumberContext || !ProContext)
    return null;
  const { setProgress } = ProContext;

  const { cardNumberData } = CardNumberContext;
  const { setChangePage } = pageContext;

  if (!sharedContext || !checkSlugContext) return null;

  const { shareData } = sharedContext;

  console.log(shareData?.cardNumber, shareData?.iban, shareData?.ownerName);
  async function getSlug() {
    if (
      !shareData?.iban ||
      !shareData?.ownerName ||
      !cardNumberData ||
      !inputValue
    ) {
      console.warn("⚠️نه");
      addToast({
        description: "وارد کردن دامنه الزامی است",
        color: "danger",
        title: "خطا",
      });

      return;
    }

    try {
      type dataTypes = {
        slug: string;
        cardNumber: string;
        iban: string;
        ownerName: string;
      };

      const { data }: any = await FetchingData<dataTypes>({
        endpoint: "/api/internal/get-data-by-slug",
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
        addToast({
          description: "کارت شما با موفقیت ثبت شد",
          color: "success",
          title: "تبریک!",
        });

        console.log(data.card);
        router.push("/cards");
      } else {
        console.warn("⚠️ خطا یا تکراری بودن:", data.error);
        addToast({
          description: "دامنه تکراری است",
          color: "danger",
          title: "خطا",
        });
        setChangePage("slug");
      }
    } catch (err) {
      console.error("⛔ خطا در برقراری ارتباط با سرور:", err);
    }
  }

  console.log(inputValue);

  return (
    <div className="CREATE_CARDS_CONTAINER">
      {Icon.earth}
      <div className="w-full min-h-[10vh] flex flex-col items-center justify-center gap-4">
        <span className="text-medium text-sm text-center">
          دامنه مورد نظر خود را وارد نمایید{" "}
        </span>
        <span className="text-medium text-sm">
          از دامنه برای اشتراک گذاری کارت استفاده خواهد شد
        </span>
      </div>
      <Input
        className="w-full"
        onChange={async (e) => {
          setInputValue(e.target.value);
        }}
      />
      <div className="flex flex-col  gap-2">
        <span className="text-medium text-[12px] text-red-500">
          لطفا حداقل 4 کاراکتر وارد کنید
        </span>
        <span className="text-medium text-[12px] text-red-500">
          تنها حروف انگلیسی یا اعداد مجاز هستند
        </span>
        <span className="text-medium text-[12px] text-red-500">
          حداکثر طول نام کاربری 16رقم است{" "}
        </span>
      </div>
      <span>{checkSlugExsisted === false ? "معتبر نیست" : ""}</span>
      <div className="w-full flex items-center gap-2">
        <Button
          className="w-full "
          color="primary"
          radius="sm"
          onPress={() => {
            getSlug();
          }}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
