"use client";
import { Divider, ToastProvider } from "@heroui/react";
import { HeroUIProvider } from "@heroui/system";
import Navbar from "./navbar";

export default function LayoutStyle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex h-full w-full flex-col  items-center justify-center relative  gap-20   ">
      <HeroUIProvider className="">
        <ToastProvider placement="top-center" />
        {children}
      </HeroUIProvider>
      <div className="w-full absolute bottom-2 ">
        <Divider />
        <div className="  ">
          <Navbar />
        </div>
      </div>
    </section>
  );
}
