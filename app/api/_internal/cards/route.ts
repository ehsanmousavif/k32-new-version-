import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { username, cardNumber } = await req.json();

    if (!username || !cardNumber) {
      return NextResponse.json(
        { error: "username و cardNumber الزامی هستند" },
        { status: 400 }
      );
    }

    // 1️⃣ بررسی تکراری نبودن username
    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "این نام کاربری قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    // 2️⃣ بررسی تکراری نبودن cardNumber در جدول کارت‌ها
    const existingCard = await db.card.findUnique({
      where: { cardNumber },
    });

    if (existingCard) {
      return NextResponse.json(
        { error: "این شماره کارت قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    // 3️⃣ بررسی اعتبار کارت در جدول validatedCard
    const validated = await db.validatedCard.findUnique({
      where: { cardNumber },
    });

    if (!validated) {
      return NextResponse.json(
        { error: "شماره کارت معتبر نیست یا در دیتابیس ولید وجود ندارد" },
        { status: 404 }
      );
    }

    // 4️⃣ ساخت کاربر جدید به همراه کارت معتبر
    const user = await db.user.create({
      data: {
        username,
        cards: {
          create: {
            cardNumber,
            ownerName: validated.ownerName,
            iban: validated.iban,
          },
        },
      },
      include: { cards: true },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("❌ خطا در ایجاد کاربر:", error);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
