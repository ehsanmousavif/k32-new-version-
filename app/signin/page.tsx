"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Divider, Input, addToast, useToast } from "@heroui/react";
import Link from "next/link";

import { Prisma } from "@/generated/prisma";
import { FetchingData } from "@/lib/fetching-data";
import { Icon } from "@/components/icons/icons";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function checkTokenAndGetUser() {
    setIsLoading(true);

    try {
      const { data, error }: any = await FetchingData<
        Prisma.UserGetPayload<{ select: { password: true; userName: true } }>
      >({
        endpoint: "/api/internal/auth/signin",
        body: { userName, password },
        requiresAuth: false,
      });

      if (error) {
        addToast({
          title: "خطا",
          description: error,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "danger",
        });
      } else {
        localStorage.setItem("auth-token", data.token);
        addToast({
          title: "موفق",
          description: "ثبت‌نام با موفقیت انجام شد!",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });

        router.push("/create-card");
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

    checkTokenAndGetUser();
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="BASE_CONTAINER"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className=" w-full max-w-2xl p-5 pt-2 rounded-xl box-border mx-auto flex flex-col items-center justify-center gap-4  text-foreground font-vazir">
        {Icon.user}
        <span className="text-sm">
          برای ساخت حساب نام کاربری و رمز عبور را وارد نمایید
        </span>

        <Input
          isRequired
          className=" w-full font-vazir"
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
          ثبت نام
        </Button>

        <Divider />
        <Button className="w-full bg-secondary-200/50 text-foreground-800 py-2 rounded-md font-vazir">
          <Link href="/signup">قبلا ثبت نام کردم 😌</Link>
        </Button>
      </div>
    </motion.div>
  );
}
