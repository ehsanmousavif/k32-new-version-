"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

import { useSignOut } from "@/lib/signout";
import { ShowModal } from "@/components/modal";
import { Icon } from "@/components/icons/icons";

export default function LayoutStyle({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signOut = useSignOut();
  const activeStyle = "text-primary text-primary rounded-full p-1";

  return (
    <div className="relative h-screen flex flex-col py-4">
      <nav className="fixed bottom-0 left-0 right-0 z-50  my-2 bg-black text-white shadow-md">
        <div className="w-auto ">
          <ShowModal
            isOpen={isModalOpen}
            signOut={signOut}
            onClose={() => setIsModalOpen(false)}
          />
          <div className="w-full  flex flex-col  items-center justify-center ">
            <ul className=" w-full flex items-center justify-evenly gap-4 mt-4">
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
        </div>
      </nav>

      {/* محتوای اصلی */}
      <main className="flex-1 overflow-y-auto pt-2">{children}</main>
    </div>
  );
}
