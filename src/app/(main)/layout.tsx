"use client";

import MainLayout from "@/components/layouts/main-layout";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <Suspense>{children}</Suspense>
    </MainLayout>
  );
}
