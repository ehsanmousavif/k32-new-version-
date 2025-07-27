import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json(
      { error: "وارد کردن یک نام کاربری الزامی است" },
      { status: 400 }
    );
  }

  const existsUser = await db.user.findUnique({
    where: { slug },
  });

  if (existsUser) {
    return NextResponse.json(
      { error: "این نام کاربری قبلاً ثبت شده است" },
      { status: 409 }
    );
  }

  const newUser = await db.user.create({
    data: {
      slug,
      cardNumber: "", // می‌تونی اینو بعداً مقدار بدی یا از context بگیری
    },
  });

  return NextResponse.json({
    message: "نام کاربری با موفقیت ثبت شد",
    user: newUser,
  });
}
