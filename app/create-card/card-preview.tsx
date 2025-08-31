import React, { useContext, useState } from "react";
import { Button, Checkbox } from "@heroui/react";

import CardBank from "@/components/card";
import { Icon } from "@/components/icons/icons";
import { CardContext } from "@/components/CardProvider";
import CardBankSkeleton from "@/components/card-bank-skeleton";

export default function CardPreview() {
  const [checkField, setCheckField] = useState(false);
  const context = useContext(CardContext);

  if (!context) return null;

  const { shareData, setProgress, setChangePage } = context;

  // if (!shareData) {
  //   return (

  //   );
  // }

  return (
    <div className="CREATE_CARDS_CONTAINER">
      <div className="w-auto ">
        {!shareData ? (
          <div className="w-auto">
            <CardBankSkeleton />;
          </div>
        ) : (
          <CardBank
            iban={shareData?.iban || ""}
            name={shareData?.ownerName || ""}
            number={shareData?.cardNumber || ""}
          />
        )}
      </div>
      <Checkbox
        className="font-vazir mt-6"
        isSelected={checkField}
        onChange={(e) => setCheckField(e.target.checked)}
      >
        <span className="text-white"> اطلاعات را تأیید می‌کنم</span>
      </Checkbox>
      <div className="w-full flex items-center gap-2">
        <Button
          className={` w-full font-vazir ${!checkField ? "opacity-50 cursor-not-allowed" : ""}`}
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
