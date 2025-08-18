import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontVazir } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import ProtectedRoute from "@/lib/token-validated";

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
    <html suppressHydrationWarning className={fontVazir.variable} lang="fa">
      <head />
      <body className="h-[100dvh] bg-black text-foreground antialiased flex flex-col">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* محتوای وسط با عرض محدود */}
          <main className="flex-grow flex justify-center items-center p-4">
            <div className="w-[798px] h-full max-h-[100dvh] flex flex-col justify-center  p-8 text-white backdrop-blur-3xl rounded-lg">
              {children}
            </div>
          </main>

          {/* Navbar پایین و تمام عرض */}
          <footer className="w-full h-[60px]">{/* <Navbar /> */}</footer>
        </Providers>
      </body>
    </html>
  );
}
