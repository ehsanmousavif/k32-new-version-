import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontVazir } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fa" className={fontVazir.variable}>
      <head />
      <body
        className={clsx(
          " max-w-2xl m-auto min-h-screen  text-foreground bg-white  antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className=" min-h-screen relative flex flex-col p-0 m-0 c">
            <main
              className=" p-8 text-white 
                bg-white/20
                 backdrop-blur-3xl
                  border border-white/20
                  rounded-lg w-full  bac min-h-screen container mx-auto flex-grow relative "
            >
              <div className="backdrop-filter ">{children}</div>
              <div className=" absolute  bottom-2 left-4 right-4">
                <Navbar />
              </div>
            </main>

            <footer className="w-full flex items-center justify-center "></footer>
            <Link
              isExternal
              className="flex items-center justify-center  gap-1 text-current"
              href="https://heroui.com?utm_source=next-app-template"
              title="heroui.com homepage"
            ></Link>
          </div>
        </Providers>
      </body>
    </html>
  );
}
