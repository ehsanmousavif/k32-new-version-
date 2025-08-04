import { NextRequest, NextResponse } from "next/server";

import { getCardInfo } from "@/lib/get-card-info";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { cardNumber } = await req.json();

  if (!cardNumber)
    return NextResponse.json(
      { error: "شماره کارت الزامی است" },
      { status: 400 }
    );

  // ۱. چک در validatedCard
  const existing = await db.validatedCard.findUnique({
    where: { cardNumber },
  });

  if (existing) {
    return NextResponse.json(existing);
  }

  const cardInfo = await getCardInfo(cardNumber);

  // ۳. ذخیره در validatedCard
  const saved = await db.validatedCard.create({
    data: {
      cardNumber: cardInfo.cardNumber,
      iban: cardInfo.iban,
      ownerName: cardInfo.ownerName,
    },
  });

  return NextResponse.json(saved);
}
