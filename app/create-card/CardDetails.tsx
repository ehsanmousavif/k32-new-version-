import React, { useContext } from "react";
import { Button } from "@heroui/button";

import { ProgressContext, PageContext } from "./page";

import CardBank from "@/components/card";

export default function CardDetails() {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);

  if (!ProContext || !pageContext) return null;
  const { setProgress } = ProContext;
  const { setChangePage } = pageContext;

  return (
    <div>
      <div className="w-full" />
      <CardBank value="6219861908544323" />
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
