import React, { useContext } from "react";

import { ProgressContext } from "./page";
import { Card } from "@heroui/react";
import CardBank from "@/components/card";

export default function SelectSlug() {
  const ProContext = useContext(ProgressContext);

  if (!ProContext) return null;

  const { progress, setProgress } = ProContext;

  return (
    <div>
      <CardBank value="6219861908544323" />
    </div>
  );
}
