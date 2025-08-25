"use client";
import { ToastProvider } from "@heroui/react";
import { HeroUIProvider } from "@heroui/system";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-auto">
      <HeroUIProvider className="">
        <ToastProvider placement="top-center" />
        {children}
      </HeroUIProvider>
    </div>
  );
}
