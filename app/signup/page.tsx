"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
    }
  }

  async function nextPage() {
    sendAuthData();
    router.push("/create-card");
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <span className="font-vazir text-black">
        نام کاربری و رمز عبور خود را وارد نمایید
      </span>
      <Input
        className="w-72 font-vazir"
        label="نام کاربری"
        size={"sm"}
        type="text"
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        className="w-72 font-vazir "
        label="رمز عبور"
        size={"sm"}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className="w-2/3 font-vazir"
        color="primary"
        onPress={() => {
          nextPage();
        }}
      >
        تایید
      </Button>
    </div>
  );
}
