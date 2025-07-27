import React, { useContext, useState } from "react";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/react"; // مطمئن شو مسیر درسته

import { ProgressContext, PageContext, shareDataContext } from "./page";

import CardBank from "@/components/card";

export default function CardPreview() {
  const [checkField, setCheckField] = useState(false); // مقدار اولیه false

  const sharedContext = useContext(shareDataContext);
  const proContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);

  if (!proContext || !pageContext || !sharedContext) return null;

  const { shareData } = sharedContext;
  const { setProgress } = proContext;
  const { setChangePage } = pageContext;

  return (
    <div>
      <CardBank
        iban={shareData?.iban || ""}
        name={shareData?.ownerName || ""}
        number={shareData?.cardNumber || ""}
      />

      <Checkbox
        className="font-vazir mt-6 "
        isSelected={checkField}
        onChange={(e) => setCheckField(e.target.checked)}
      >
        <span className="text-black"> اطلاعات را تأیید می‌کنم</span>
      </Checkbox>

      <Button
        fullWidth
        className={`font-vazir mt-4 ${
          !checkField ? "opacity-50 cursor-not-allowed" : ""
        }`}
        color="primary"
        isDisabled={!checkField}
        radius="full"
        size="md"
        onPress={async () => {
          setChangePage("slug");
          setProgress("100");
        }}
      >
        تایید
      </Button>
    </div>
  );
}
