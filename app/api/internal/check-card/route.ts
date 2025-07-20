import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cardNumber } = body;

  if (!cardNumber) {
    return NextResponse.json(
      { error: "Card number is required." },
      { status: 400 }
    );
  }

  const card = await db.card.findUnique({
    where: {
      cardNumber,
    },
  });

  if (card) {
    return NextResponse.json({ error: "Card exists" }, { status: 401 });
  }

  return NextResponse.json({
    message: "ok",
  });
}
