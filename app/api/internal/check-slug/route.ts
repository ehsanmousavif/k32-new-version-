import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { slug, cardNumber } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { error: "وارد کردن یک نام کاربری الزامی است" },
        { status: 400 }
      );
    }

    const existsUser = await db.card.findUnique({
      where: { slug },
    });

    if (existsUser) {
      return NextResponse.json(
        { error: "این نام کاربری قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    const newUser = await db.card.create({
      data: {
        slug,
        cardNumber: cardNumber,
        fullName: "",
        iban: "",
        userId: 0,
      },
    });

    return NextResponse.json({
      message: "نام کاربری با موفقیت ثبت شد",
      user: newUser,
    });
  } catch (err) {
    console.error("⛔ خطای سرور در check-slug:", err);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
