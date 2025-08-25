import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontVazir } from "@/config/fonts";
import ProtectedRoute from "@/lib/token-validated";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/react";

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
      <body className=" bg-black text-foreground antialiased flex flex-col p-0">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="flex-grow flex justify-center items-center p-0">
            <div
              className="max-w-2xl m-auto h-screen flex flex-col justify-center items-center text-white backdrop-blur-3xl rounded-lg font-vazir"
              style={{ direction: "rtl" }}
            >
              <ProtectedRoute>
                {" "}
                <HeroUIProvider className="">
                  <ToastProvider placement="top-center" />
                  {children}
                </HeroUIProvider>
              </ProtectedRoute>
            </div>
          </main>

          {/* Navbar پایین و تمام عرض */}
          {/* <footer className="w-full h-[60px]">
            <Navbar />
          </footer> */}
        </Providers>
      </body>
    </html>
  );
}
