import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { error: "اسلاگ ارسال نشده است" },
        { status: 400 }
      );
    }

    const card = await db.card.findUnique({
      where: { slug },
    });

    if (!card) {
      return NextResponse.json(
        { error: "کارت با این اسلاگ یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: card,
      message: "کارت با موفقیت ساخته شد",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("⛔ خطای سرور:", error.message);
    }

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
