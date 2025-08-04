import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userName, password } = await req.json();

  if (!userName || !password) {
    return NextResponse.json(
      { error: "نام کاربری و رمز عبور الزامی است" },
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({
    where: { userName: userName },
  });

  if (!user) {
    return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
  }

  return NextResponse.json({
    message: "✅ ورود موفق بود",
    token: user.token,
  });
}
