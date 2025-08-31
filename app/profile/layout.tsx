"use client";

import LayoutStyle from "@/components/layoutStlye";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutStyle>{children}</LayoutStyle>;
}
