import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { DispatchToken } from "@/lib/dispatch-token";
import { Card } from "@/generated/prisma";

export async function POST(req: NextRequest) {
  const token = await DispatchToken();

  try {
    const { slug, cardNumber, ownerName, iban } = await req.json();

    console.log("📥 دریافت از کلاینت:", { slug, cardNumber, ownerName, iban });

    if (!token) {
      return NextResponse.json({ error: "ریدی" }, { status: 200 });
    }

    if (!cardNumber) {
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

    const card: Card = await db.card.create({
      data: {
        slug,
        cardNumber: cardNumber,
        fullName: ownerName,
        iban: iban,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "کارت با موفقیت ساخته شد",
        data: card,
        ok: true,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("⛔ خطای سرور:", err);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
