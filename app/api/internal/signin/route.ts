import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { password, userName } = await req.json();

  if (!password || !userName)
    return NextResponse.json({ error: "فیلدها ناقص هستند" }, { status: 400 });

  const checkExstedUser = await db.user.findUnique({
    where: { userName },
  });

  if (checkExstedUser && checkExstedUser.password === password) {
    return NextResponse.json({ error: "قبلاً ثبت‌نام کردی" }, { status: 409 });
  }

  // توکن ساز
  function generateToken(length = 64) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * chars.length);

      token += chars[randIndex];
    }

    return token;
  }

  const token = generateToken();

  const newUser = await db.user.create({
    data: {
      userName,
      password,
      token,
    },
  });

  return NextResponse.json(
    {
      message: "ثبت‌نام موفق بود",
      token: newUser.token,
      user: {
        id: newUser.id,
        userName: newUser.userName,
      },
    },
    { status: 200 }
  );
}
