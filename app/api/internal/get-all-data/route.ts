// /app/api/fake-card/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  const fakeCard = {
    cardNumber: "6104338980429662",
    iban: "IR123456789012345678901234",
    ownerName: "سید احسان موسوی فرخانی",
  };

  return NextResponse.json(fakeCard);
}
