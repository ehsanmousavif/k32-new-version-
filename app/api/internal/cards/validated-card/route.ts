import { NextRequest, NextResponse } from "next/server";

import { getCardInfo } from "@/lib/get-card-info";
import { db } from "@/lib/prisma";
import { DispatchToken } from "@/lib/dispatch-token";

export async function POST(req: NextRequest) {
  const { cardNumber } = await req.json();
  const token = await DispatchToken();

  if (!token) {
    return NextResponse.json({ error: "ریدی" }, { status: 200 });
  }
  if (!cardNumber)
    return NextResponse.json(
      { error: "شماره کارت الزامی است" },
      { status: 400 }
    );

  const tokenValidated = await db.user.findMany({
    where: { token: token },
  });

  if (!tokenValidated) {
    return NextResponse.json(
      {
        error: "توکن نداری,",
      },
      { status: 401 }
    );
  }
  const existing = await db.validatedCard.findUnique({
    where: { cardNumber },
  });

  if (existing) {
    return NextResponse.json(existing);
  }

  const cardInfo = await getCardInfo(cardNumber);

  const card = await db.validatedCard.create({
    data: {
      cardNumber: cardInfo.cardNumber,
      iban: cardInfo.iban,
      ownerName: cardInfo.ownerName,
    },
  });

  return NextResponse.json(card);
}
