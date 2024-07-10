"use client";

import SettingsLayout from "@/components/layouts/settings-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
