import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontVazir } from "@/config/fonts";
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
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // این خط جلوی زوم رو می‌گیره
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={fontVazir.variable}
      dir="rtl"
      lang="fa"
    >
      <head />
      <body className="text-foreground antialiased flex flex-col">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="h-[100dvh] flex-grow flex justify-center items-center">
            <div
              className=" overflow-x-hidden max-w-2xl m-auto h-full flex flex-col justify-center items-center text-white backdrop-blur-3xl p-0 font-vazir"
              style={{ direction: "rtl" }}
            >
              <ProtectedRoute>{children}</ProtectedRoute>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
