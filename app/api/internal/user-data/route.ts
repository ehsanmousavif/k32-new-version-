import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    console.log("❌ توکن ارسال نشده");

    return NextResponse.json({ error: "توکن ارسال نشده است" }, { status: 400 });
  }

  const user = await db.user.findFirst({
    where: { token },
  });

  if (!user) {
    console.log("❌ کاربر با این توکن پیدا نشد");

    return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 401 });
  }

  const data = await db.card.findFirst({
    where: { userId: user.id },
  });

  if (!user) {
    console.log("❌ کاربر با این توکن پیدا نشد");

    return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 401 });
  }

  return NextResponse.json({
    message: "✅ اطلاعات کاربر دریافت شد",
    user,
    data,
  });
}
