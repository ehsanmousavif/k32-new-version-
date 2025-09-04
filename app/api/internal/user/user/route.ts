import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { DispatchToken } from "@/lib/dispatch-token";

export async function POST() {
  const token = await DispatchToken();

  if (!token) {
    console.log("❌ توکن ارسال نشده");

    return NextResponse.json({ error: "توکن ارسال نشده است" }, { status: 400 });
  }

  const user = await db.user.findFirst({
    where: { token: token },
    include: { cards: { select: { cardNumber: true } } },
  });

  if (!user) {
    console.log("❌ کاربر با این توکن پیدا نشد");

    return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 401 });
  }

  const card = await db.card.findFirst({
    where: { userId: user.id },
  });

  if (!user) {
    console.log("❌ کاربر با این توکن پیدا نشد");

    return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 401 });
  }

  return NextResponse.json({
    message: "✅ اطلاعات کاربر دریافت شد",
    data: { user, card },
    ok: true,
  });
}
