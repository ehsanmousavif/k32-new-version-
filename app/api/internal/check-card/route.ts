import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { headers } from "next/headers";
// import { error } from "console";

export async function POST(req: NextRequest) {
  const headerList = await headers();
  const auth = headerList.get("Authorization");
  const token = auth?.split(" ")[1];

  if (!auth?.startsWith("Bearer ")) {
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
    });
  }
}
