"use client";
import { motion } from "framer-motion";

import { Button, Input, InputOtp, NumberInput } from "@heroui/react";
import React, { useContext } from "react";

import { ProgressContext, PageContext, CardDataContext } from "./page";
import { Icon } from "@/components/icons/icons";
("./card-preview");

interface Functions {
  sendData: () => any;
  fetchValidatedCard: () => any;
}

export default function CardEntry({ sendData, fetchValidatedCard }: Functions) {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const CardNumberContext = useContext(CardDataContext);

  if (!ProContext || !pageContext || !CardNumberContext) return null;

  const { cardNumberData, setCardNumberData } = CardNumberContext;
  const { setProgress } = ProContext;
  const { setChangePage } = pageContext;

  return (
    <motion.div
      className="CREATE_CARDS_CONTAINER"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {Icon.card}
      <div className="w-full min-h-[35vh] flex flex-col items-center justify-center gap-4">
        <span className="font-normal">شماره کارت خود را وارد کنید</span>
        <Input
          className="m-auto max-w-md w-full"
          errorMessage={"شماره کارت شما باید ۱۶ رقم باشد"}
          isInvalid={!cardNumberData || cardNumberData.length !== 16}
          value={cardNumberData ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCardNumberData(e.target.value)
          }
        />
      </div>
      <Button
        className="w-full "
        color="primary"
        isDisabled={!cardNumberData || cardNumberData.length !== 16}
        radius="sm"
        size="md"
        onPress={() => {
          sendData();
          fetchValidatedCard();
          setProgress("60");
          setChangePage("card-preview");
        }}
      >
        تایید
      </Button>
    </motion.div>
  );
}
