import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { cardNumber, iban, ownerName } = await req.json();

  if (!cardNumber) {
    return NextResponse.json(
      { error: "شماره کارت الزامی است" },
      { status: 400 }
    );
  }

  const checkCardNumber = await db.validatedCard.findUnique({
    where: { cardNumber },
  });

  if (checkCardNumber) {
    // اگر قبلاً ذخیره شده بود، همونو برمی‌گردونه
    return NextResponse.json(checkCardNumber);
  }

  // اگر نبود، ثبت می‌کنیم و همون رو برمی‌گردونیم
  const newCard = await db.validatedCard.create({
    data: { cardNumber, iban: iban, ownerName: ownerName },
  });

  return NextResponse.json(newCard);
}
