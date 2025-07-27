import { Input } from "@heroui/input";
import React, { useContext, useState } from "react";
import { Button } from "@heroui/button";

import { checkSlugResponseContext } from "./page";
export default function Slug() {
  const [inputValue, setInputValue] = useState("");

  const checkSlugContext = useContext(checkSlugResponseContext);
  if (!checkSlugContext) return null;
  const { checkSlug, setCheckSlug } = checkSlugContext;

  async function getSlug() {
    try {
      const res = await fetch("/api/internal/check-slug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: inputValue }), // اینم حتما باید JSON باشه!
      });

      const response = await res.json(); // اینجا باید await بزاری

      if (res.ok) {
        console.log("✅ نام کاربری ثبت نشده است:", response);
        setCheckSlug(response);
        console.log(checkSlug);
      } else {
        console.warn("⚠️ خطا یا تکراری بودن:", response.error || response);
      }
    } catch (err) {
      console.error("⛔ خطا در برقراری ارتباط با سرور:", err);
    }
  }

  return (
    <div>
      <Input
        className="w-56"
        onChange={async (e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        className="w-56 bg-black mt-64"
        onPress={() => {
          getSlug(), () => {};
        }}
      >
        نهایی کردن کارت
      </Button>
    </div>
  );
}
