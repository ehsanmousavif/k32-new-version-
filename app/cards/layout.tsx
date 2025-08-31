"use client";

import LayoutStyle from "@/components/layoutStlye";

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutStyle>
      <div className="fixed m-auto inset-0 z-999 pointer-events-none" />
      <div className="relative m-auto px-0 py-0 z-0 overflow-auto h-screen w-full px">
        {children}
      </div>
    </LayoutStyle>
  );
}
