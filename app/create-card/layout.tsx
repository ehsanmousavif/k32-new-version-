"use client";
import { ToastProvider } from "@heroui/react";
import { HeroUIProvider } from "@heroui/system";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[clac(100vh-60px)] flex-col items-center justify-center gap-4  md:py-10">
      <HeroUIProvider className="">
        <ToastProvider placement="top-center" />
        {children}
      </HeroUIProvider>{" "}
    </section>
  );
}
