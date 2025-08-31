import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { DispatchToken } from "@/lib/dispatch-token";

export async function POST() {
  try {
    const token = await DispatchToken();
    if (!token) {
      return NextResponse.json({ error: "توکن پیدا نشد" }, { status: 401 });
    }

    const user = await db.user.findFirst({ where: { token } });
    if (!user) {
      return NextResponse.json({ error: "توکن معتبر نیست" }, { status: 401 });
    }

    const cards = await db.card.findMany({
      where: { userId: user.id },
      select: { cardNumber: true, fullName: true, iban: true },
    });

    if (!cards || cards.length === 0) {
      return NextResponse.json(
        { message: "هیچ کارتی ثبت نشده است" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "اطلاعات کارت با موفقیت دریافت شد",
      token,
      cards, // آرایه همه کارت‌ها
    });
  } catch (error: unknown) {
    console.error("⛔ خطای سرور:", error);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
