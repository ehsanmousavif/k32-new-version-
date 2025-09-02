"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Divider, Input, addToast } from "@heroui/react";
import Link from "next/link";

import { Icon } from "@/components/icons/icons";

export default function SignUp() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function authorization() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/internal/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        addToast({
          title: "خطا",
          description: data.error || "نام کاربری یا رمز عبور صحیح نیست ❌",
          color: "danger",
        });
      } else {
        localStorage.setItem("auth-token", data.token.token);
        addToast({
          title: "موفق",
          description: "ورود با موفقیت انجام شد!",
          color: "success",
        });
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      addToast({
        title: "خطا",
        description: "خطا در ارتباط با سرور ⚠️",
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
        color: "danger",
      });
    }
    authorization();
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="BASE_CONTAINER"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full max-w-2xl p-5 pt-2 rounded-xl box-border mx-auto flex flex-col items-center justify-center gap-4 font-vazir text-foreground">
        {Icon.user}
        <span className="text-sm text-center">
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
          className="w-full font-vazir"
          endContent={Icon.pass}
          label="رمز عبور"
          labelPlacement="inside"
          radius="md"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full py-2 rounded-md font-vazir bg-primary text-white"
          isLoading={isLoading}
          variant="flat"
          onPress={handleSubmit}
        >
          ورود
        </Button>

        <Divider />
        <Button className="w-full py-2 rounded-md font-vazir bg-secondary-200/50 text-foreground-800">
          <Link href="/signin">ثبت نام نکردم 🗿</Link>
        </Button>
      </div>
    </motion.div>
  );
}
