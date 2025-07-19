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

  // پیدا کردن کارت و گرفتن اطلاعات کاربر از طریق relation
  const card = await db.card.findUnique({
    where: {
      cardNumber,
    },
    include: {
      user: true, // اینجا ارتباط رو می‌گیریم
    },
  });

  if (!card || !card.user) {
    return NextResponse.json(
      { error: "Card or related user not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    cardId: card.id,
    cardNumber: card.cardNumber,
    user: {
      id: card.user.id,
      username: card.user.username,
      fullName: card.fullName,
    },
  });
}
