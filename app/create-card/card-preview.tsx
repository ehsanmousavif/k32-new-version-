import React, { useContext } from "react";
import { Button } from "@heroui/button";

import {
  ProgressContext,
  PageContext,
  CardDataContext,
  ValidatedCardContext,
} from "./page";

import CardBank from "@/components/card";

interface Props {
  validated: {
    iban: string;
    ownerName: string;
    cardNumber: string;
  } | null;
}

export default function CardPreview({ validated }: Props) {
  const proContext = useContext(ProgressContext);
  const pageContext = useContext(PageContext);
  const cardContext = useContext(CardDataContext);
  const validatedContext = useContext(ValidatedCardContext);

  if (!proContext || !pageContext || !cardContext || !validatedContext)
    return null;

  const { setProgress } = proContext;
  const { setChangePage } = pageContext;

  return (
    <div>
      <Button
        fullWidth
        className="font-vazir mt-8"
        color="primary"
        radius="full"
        size="md"
        onPress={async () => {
          setChangePage("slug");
          setProgress("100");
        }}
      >
        تایید
      </Button>

      <CardBank
        iban={validated?.iban || ""}
        name={validated?.ownerName || ""}
        number={validated?.cardNumber || ""}
      />
    </div>
  );
}
