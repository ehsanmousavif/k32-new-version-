"use client";
import { motion } from "framer-motion";
import { Button, Input } from "@heroui/react";
import React, { useContext   } from "react";

import { Icon } from "@/components/icons/icons";
import { CardContext } from "@/components/CardProvider";

interface Functions {
  sendData: () => Promise<void>;
  fetchValidatedCard: () => Promise<void>;
}

export default function CardEntry({ sendData, fetchValidatedCard }: Functions) {
  const context = useContext(CardContext);

  if (!context) return null;

  const { cardNumberData, setCardNumberData, setProgress, setChangePage } =
    context;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="CREATE_CARDS_CONTAINER"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {Icon.card}
      <div className="w-full min-h-[35vh] flex flex-col items-center justify-center gap-4">
        <span className="font-normal">شماره کارت خود را وارد کنید</span>
        <Input
          className="m-auto max-w-md w-full"
          errorMessage={"شماره کارت شما باید ۱۶ رقم باشد"}
          inputMode="decimal"
          isInvalid={!cardNumberData || cardNumberData.length !== 16}
          pattern="[0-9]*"
          value={cardNumberData ?? ""}
          onChange={(e) => setCardNumberData(e.target.value)}
        />
      </div>

      <Button
        className="w-full"
        color="primary"
        isDisabled={!cardNumberData || cardNumberData.length !== 16}
        radius="sm"
        size="md"
        onPress={() => {
          sendData();
          fetchValidatedCard();
          if (!fetchValidatedCard() === null || undefined) {
            return;
          } else {
            setProgress("60");
            setChangePage("card-preview");
          }
        }}
      >
        تایید
      </Button>
    </motion.div>
  );
}
