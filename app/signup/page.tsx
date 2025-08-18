"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons/icons";
import { Divider } from "@heroui/react";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendAuthData() {
    const res = await fetch("/api/internal/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });

    const data = await res.json();

    localStorage.setItem("auth-token", data.token);

    if (res.ok) {
      console.log("✅ Success", data);
    } else {
      console.error("❌ Server error", data);
      setError("نام کاربری یا رمز عبور صحیح نیست ❌");
    }
  }

  async function nextPage() {
    sendAuthData();
    router.push("/create-card");
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
          onPress={nextPage}
        >
          {isLoading ? "در حال بررسی..." : "بررسی و دریافت اطلاعات"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Divider />
        <Button className="w-full bg-success-200 text-white py-2 rounded-md font-vazir">
          <Link href="/signin">ثبت نام کردم😌</Link>
        </Button>
      </div>
    </div>
  );
}
