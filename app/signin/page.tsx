"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Divider, Input } from "@heroui/react";

import { Prisma } from "@/generated/prisma";
import { FetchingData } from "@/lib/fetching-data";
import { Icon } from "@/components/icons/icons";
import Link from "next/link";
import SignUp from "../signup/page";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function checkTokenAndGetUser() {
    setIsLoading(true);
    setError(null);

    try {
      const { data }: any = await FetchingData<
        Prisma.UserGetPayload<{ select: { password: true; userName: true } }>
      >({
        endpoint: "/api/internal/auth/signin",
        body: { userName, password },
        requiresAuth: false,
      });

      if (!data) {
        setError("نام کاربری یا رمز عبور صحیح نیست ❌");
      } else {
        localStorage.setItem("auth-token", data.token.token);
        router.push("/create-card");
      }
    } catch (err) {
      console.error(err);
      setError("خطا در ارتباط با سرور ⚠️");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="w-[350px] p-8 rounded-xl box-border mx-auto flex flex-col items-center justify-center gap-4 bg-content1 text-foreground font-vazir">
        <span>برای ورود نام کاربری و رمز عبور را وارد نمایید</span>

        <Input
          isRequired
          className="font-vazir"
          endContent={Icon.mail}
          label="نام کاربری"
          labelPlacement="inside"
          radius="md"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />

        <Input
          isRequired
          className="font-vazir"
          endContent={Icon.pass}
          label="رمز عبور"
          labelPlacement="inside"
          radius="md"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full bg-primary text-white py-2 rounded-md font-vazir"
          isLoading={isLoading}
          onPress={checkTokenAndGetUser}
        >
          {isLoading ? "در حال بررسی..." : "بررسی و دریافت اطلاعات"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Divider />
        <Button className="w-full bg-secondary-200/50 text-foreground-800 py-2 rounded-md font-vazir">
          <Link href="/signup">ثبت نام نکردم 🗿</Link>
        </Button>
      </div>
    </div>
  );
}
