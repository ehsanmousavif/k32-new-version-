"use client";
import { motion } from "framer-motion";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons/icons";
import { Divider, addToast } from "@heroui/react";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendAuthData() {
    setIsLoading(true);

    try {
      const res = await fetch("/api/internal/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast({
          title: "خطا",
          description: data.error || "نام کاربری یا رمز عبور صحیح نیست ❌",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "danger",
        });
      } else {
        localStorage.removeItem("auth-token");
        localStorage.setItem("auth-token", data.token.token);
        addToast({
          title: "موفق",
          description: "ثبت‌نام با موفقیت انجام شد!",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
        console.log(data);
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      addToast({
        title: "خطا",
        description: "خطا در ارتباط با سرور ⚠️",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    if (!userName || !password) {
      return addToast({
        title: "خطا",
        description: "نام کاربری و رمز عبور نمی‌توانند خالی باشند!",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
    }

    sendAuthData();
  }

  return (
    <motion.div
      className="BASE_CONTAINER"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full max-w-2xl p-5 pt-2 rounded-xl box-border mx-auto flex flex-col items-center justify-center gap-4 text-foreground font-vazir">
        {Icon.user}
        <span className="text-sm">
          برای ورود نام کاربری و رمز عبور را وارد نمایید
        </span>

        <Input
          isRequired
          className="w-full font-vazir"
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
          variant={"flat"}
          onPress={handleSubmit}
        >
          ورود
        </Button>

        <Divider />
        <Button className="w-full bg-green-900 text-foreground-800 py-2 rounded-md font-vazir">
          <Link href="/signin">ثبت نام نکردم 🗿</Link>
        </Button>
      </div>
    </motion.div>
  );
}
