import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "توکن ارسال نشده است" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({ where: { token } });

    if (!user) {
      return NextResponse.json({ error: "توکن معتبر نیست" }, { status: 401 });
    }

    const showCardData = await db.card.findFirst({
      where: { userId: user.id },
    });

    if (!showCardData) {
      return NextResponse.json(
        { message: "هیچ کارتی ثبت نشده است" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "اطلاعات کارت با موفقیت دریافت شد",
      card: showCardData,
    });
  } catch (error: any) {
    console.error("⛔ خطای سرور:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
