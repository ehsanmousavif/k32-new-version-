import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { DispatchToken } from "@/lib/dispatch-token";
import { ok } from "assert";

export async function POST(req: NextRequest) {
  const token = await DispatchToken();

  if (!token) {
    return NextResponse.json({ error: "ریدی" }, { status: 200 });
  }
  const body = await req.json();
  const { cardNumber } = body;

  if (!cardNumber) {
    return NextResponse.json(
      { error: "Card number is required." },
      { status: 400 }
    );
  }
  const user = await db.user.findFirst({
    where: { token: token },
  });

  if (!user) {
    return NextResponse.json({
      error: "ریدی",
    });
  }
  const card = await db.card.findUnique({
    where: {
      cardNumber: cardNumber,
    },
  });

  if (card) {
    return NextResponse.json({ error: "Card exists" }, { status: 401 });
  } else {
    return NextResponse.json({
      message: "ok",
      data: card,
      ok: true,
    });
  }
}
