import React, { useContext } from "react";
import { Button } from "@heroui/button";

import {
  ProgressContext,
  PageContext,
  CardDataContext,
  ValidatedCardContext,
} from "./page";

import CardBank from "@/components/card";

interface functions {
  fetchValidatedCard: () => any;
}

export default function CardDetails({ fetchValidatedCard }: functions) {
  const proContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const cardContext = useContext(CardDataContext);
  const validatedContext = useContext(ValidatedCardContext);

  if (!proContext || !pageContext || !cardContext || !validatedContext)
    return null;

  const { setProgress } = proContext;
  const { setChangePage } = pageContext;
  const { validatedData } = validatedContext;

  return (
    <div>
      <Button
        className="font-vazir mt-8"
        color="primary"
        fullWidth
        radius="full"
        size="md"
        onPress={async () => {
          await fetchValidatedCard();
          setChangePage("slug");
          setProgress("100");
        }}
      >
        تایید
      </Button>

      {validatedData && (
        <CardBank
          iban={validatedData.iban}
          name={validatedData.ownerName}
          number={validatedData.cardNumber}
        />
      )}
    </div>
  );
}
