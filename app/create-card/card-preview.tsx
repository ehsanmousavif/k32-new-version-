import React, { useContext, useState } from "react";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/react"; // مطمئن شو مسیر درسته

import { ProgressContext, PageContext, validatedResponseContext } from "./page";

import CardBank from "@/components/card";
import { Icon } from "@/components/icons/icons";
import Link from "next/link";

export default function CardPreview() {
  const [checkField, setCheckField] = useState(false); // مقدار اولیه false

  const sharedContext = useContext(validatedResponseContext);
  const proContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);

  if (!proContext || !pageContext || !sharedContext) return null;

  const { shareData } = sharedContext;
  const { setProgress } = proContext;
  const { setChangePage } = pageContext;

  return (
    <div className="CREATE_CARDS_CONTAINER">
      <div className="w-full">
        <CardBank
          iban={shareData?.iban || ""}
          name={shareData?.ownerName || ""}
          number={shareData?.cardNumber || ""}
        />
      </div>
      <Checkbox
        className="font-vazir mt-6  "
        isSelected={checkField}
        onChange={(e) => setCheckField(e.target.checked)}
      >
        <span className="text-white"> اطلاعات را تأیید می‌کنم</span>
      </Checkbox>
      <div className="w-full flex items-center gap-2">
        <Button
          className={` w-full font-vazir ${
            !checkField ? "opacity-50 cursor-not-allowed" : ""
          }`}
          color="primary"
          isDisabled={!checkField}
          radius="sm"
          size="md"
          onPress={async () => {
            console.log(shareData);
            setChangePage("slug");
            setProgress("100");
          }}
        >
          تایید
        </Button>

        <button
          className="w-auto p-[4px] rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
          type="button"
          onClick={() => setChangePage("card-entry")}
        >
          {Icon.back}
        </button>
      </div>
    </div>
  );
}
