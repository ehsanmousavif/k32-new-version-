"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <HeroUINavbar
      className=" w-3/4 m-auto   bg-white/10  rounded-2xl"
      maxWidth="2xl"
      // position="a"
    >
      <NavbarContent className=" mx-4 basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex gap-1" href="/" />
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
                  className={`text-black ${pathName.replace(/^\//, "") === item.label.toLowerCase() ? "fit-content  border  shadow-md rounded-xl px-3 py-1 " : "text-black"} font-medium font-mono`}
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
