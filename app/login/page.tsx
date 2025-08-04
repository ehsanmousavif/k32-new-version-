"use client";

import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function checkTokenAndGetUser() {
    const res = await fetch("/api/internal/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: userName, password: password }),
    });

    const data = await res.json();

    // if (!data.userName || !data.password) {
    //   alert("❌ شما ثبت‌نام نکردید.");
    //   return;
    // }
    localStorage.setItem(data.token, "auth-token");
    console.log(data);
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
      <input
        type="text"
        placeholder="نام کاربری"
        onChange={(e) => setUserName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="رمز عبور"
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={checkTokenAndGetUser}
        className="bg-blue-600 text-white py-2 rounded"
      >
        بررسی و دریافت اطلاعات
      </button>
    </div>
  );
}
