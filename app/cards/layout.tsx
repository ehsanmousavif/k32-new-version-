"use client";
import { Icon } from "@/components/icons/icons";
import { ShowModal } from "@/components/modal";
import { useSignOut } from "@/lib/signout";
import { Button, Divider, Link, ToastProvider } from "@heroui/react";
import { HeroUIProvider } from "@heroui/system";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LayoutStyle({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signOut = useSignOut();
  const activeStyle = "text-primary rounded-full p-1";

  return (
    <section className="h-screen w-full relative flex flex-col">
      <HeroUIProvider className="flex-1 flex flex-col relative z-0">
        <ToastProvider placement="top-center" />

        {/* محتوا اسکرول بخوره */}
        <main className="flex-1 overflow-y-auto relative z-0">{children}</main>
      </HeroUIProvider>

      {/* navbar روی محتوا، ثابت پایین */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-black">
        <Divider />
        <div className="w-full flex flex-col items-center justify-center">
          <ShowModal
            isOpen={isModalOpen}
            signOut={signOut}
            onClose={() => setIsModalOpen(false)}
          />
          <ul className="w-full flex items-center justify-evenly gap-4 py-3">
            <Link href={"/profile"}>
              <li className={`${pathName === "/profile" ? activeStyle : ""}`}>
                {Icon.userProfile}
              </li>
            </Link>
            <Link href={"/cards"}>
              <li className={`${pathName === "/cards" ? activeStyle : ""}`}>
                {Icon.cards}
              </li>
            </Link>
            <Link href={"/create-card"}>
              <li
                className={`${pathName === "/create-card" ? activeStyle : ""}`}
              >
                {Icon.add}
              </li>
            </Link>
            <li>
              <Button isIconOnly onPress={() => setIsModalOpen(true)}>
                خروج
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
}
