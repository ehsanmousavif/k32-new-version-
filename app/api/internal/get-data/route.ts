import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { DispatchToken } from "@/lib/dispatch-token";

export async function POST() {
  const token = await DispatchToken();

  try {
    DispatchToken();

    if (!token) {
      return NextResponse.json({ error: "ریدی" }, { status: 200 });
    }

    const user = await db.user.findFirst({ where: { token } });

    if (!user) {
      return NextResponse.json({ error: "توکن معتبر نیست" }, { status: 401 });
    }

    const cards = await db.card.findFirst({
      where: { userId: user.id },
      select: { cardNumber: true, fullName: true, iban: true },
    });

    if (!cards) {
      return NextResponse.json(
        { message: "هیچ کارتی ثبت نشده است" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "اطلاعات کارت با موفقیت دریافت شد",
      fullName: cards.fullName,
      iban: cards.iban,
      cardNumber: cards.cardNumber,
      token: token,
    });
  } catch (error: any) {
    console.error("⛔ خطای سرور:", error.message, error.stack);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
