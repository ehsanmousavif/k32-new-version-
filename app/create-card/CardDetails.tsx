import React, { useContext } from "react";
import { ProgressContext, PageContext } from "./page";
import CardBank from "@/components/card";
import { error } from "console";
import { Button } from "@heroui/button";

export default function CardDetails() {
  const ProContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);

  if (!ProContext || !pageContext) return null; // چک کردن هر دو context

  const { progress, setProgress } = ProContext;
  const { changPage, setChangePage } = pageContext;

  return (
    <div>
      <div className="w-full">
        {/* <ProgressBar progressPercent={"60"} value={96} /> */}
      </div>
      <CardBank value="6219861908544323" />
      <Button
        className="font-vazir "
        color="primary"
        fullWidth={true}
        // isDisabled={cardValue.length !== 16}
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
