import React, { useContext } from "react";
import { Button } from "@heroui/button";

import { ProgressContext, PageContext } from "./page";
import { checkCardsContext } from "./page";

import CardBank from "@/components/card";

export default function CardDetails() {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const checkContext = useContext(checkCardsContext);

  if (!ProContext || !pageContext || !checkContext) return null;
  const { setProgress } = ProContext;
  const { setChangePage } = pageContext;
  const { checkCard } = checkContext;

  return (
    <div>
      <div className="w-full" />
      <CardBank value={checkCard || ""} />
      <Button
        className="font-vazir mt-64"
        color="primary"
        fullWidth={true}
        radius="full"
        size="md"
        onPress={() => {
          setChangePage("slug");
          setProgress("100");
        }}
      >
        تایید
      </Button>
    </div>
  );
}
