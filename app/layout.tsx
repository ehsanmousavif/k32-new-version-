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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={fontVazir.variable} lang="fa">
      <head />
      <body className="  text-foreground antialiased flex flex-col p-0">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="flex-grow flex justify-center items-center p-0">
            <div
              className="max-w-2xl m-auto  h-[100dvh] flex flex-col justify-center items-center text-white backdrop-blur-3xl  font-vazir"
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
