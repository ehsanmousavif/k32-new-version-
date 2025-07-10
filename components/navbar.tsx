"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <HeroUINavbar
      className=" w-full backdrop-blur-sm bg-white/50 rounded-2xl"
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className=" mx-4 basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex gap-1" href="/"></NextLink>
        </NavbarBrand>
        <ul className="w-full flex justify-center  items-center gap-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium m-auto "
                )}
                color="foreground"
                href={item.href}
              >
                <div
                  className={`text-black ${pathName.replace(/^\//, "") === item.label.toLowerCase() ? "fit-content border-2 border-slate-800  shadow-md rounded-xl px-3 py-1 " : "text-black"} font-medium font-mono`}
                >
                  {item.label}
                </div>
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
    </HeroUINavbar>
  );
};
