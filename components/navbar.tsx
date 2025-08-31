"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/button";

import { Icon } from "./icons/icons";
import { ShowModal } from "./modal";

import { useSignOut } from "@/lib/signout";

export default function Navbar() {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signOut = useSignOut();
  const activeStyle = "text-primary text-primary rounded-full p-1";

  return (
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
            <li className={`${pathName === "/create-card" ? activeStyle : ""}`}>
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
  );
}
