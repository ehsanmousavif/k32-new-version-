"use client";

import LayoutStyle from "@/components/layoutStlye";

export default function CreateCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutStyle>{children}</LayoutStyle>;
}
