import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { cardNumber, ownerName, iban, token } = await req.json();

    if (!cardNumber || !ownerName || !iban) {
      return NextResponse.json(
        { error: "تمام فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({ where: { token } });

    if (!user) {
      return NextResponse.json(
        { error: "کاربری با این شماره کارت پیدا نشد" },
        { status: 404 }
      );
    }

    const card = await db.card.create({
      data: {
        cardNumber: cardNumber,
        fullName: ownerName,
        iban: iban,
        userId: user.id,
      },
    });

    console.log(card, "سلام");

    return NextResponse.json(
      {
        message: "✅ کارت با موفقیت ذخیره شد",
        card,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("⛔ خطا در ثبت کارت:", error);

    return NextResponse.json(
      { error: "مشکلی در ثبت کارت پیش آمده" },
      { status: 500 }
    );
  }
}
