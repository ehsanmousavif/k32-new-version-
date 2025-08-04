import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { slug, cardNumber, token, ownerName, iban } = await req.json();

    if (!slug || !cardNumber) {
      return NextResponse.json(
        { error: "همه‌ی فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    const exists = await db.card.findUnique({ where: { slug } });

    if (exists) {
      return NextResponse.json(
        { error: "این slug قبلاً استفاده شده است" },
        { status: 409 }
      );
    }

    const user = await db.user.findFirst({ where: { token } });

    if (!user) {
      return NextResponse.json({ error: "کاربر معتبر نیست" }, { status: 401 });
    }

    const newCard = await db.card.create({
      data: {
        slug,
        cardNumber: cardNumber,
        fullName: ownerName,
        iban: iban,
        userId: user.id, // ✅ مقدار درست
      },
    });

    return NextResponse.json({
      message: "کارت با موفقیت ساخته شد",
      card: newCard,
    });
  } catch (err) {
    console.error("⛔ خطای سرور:", err);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
