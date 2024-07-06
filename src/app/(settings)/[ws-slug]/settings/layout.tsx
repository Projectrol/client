"use client";

import Auth from "@/app/auth";
import ThemeProvider from "@/app/theme-provider";
import WorkspacesProvider from "@/app/workspaces-provider";
import SettingsLayout from "@/components/layouts/settings-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Auth>
      <WorkspacesProvider>
        <ThemeProvider>
          <SettingsLayout>{children}</SettingsLayout>
        </ThemeProvider>
      </WorkspacesProvider>
    </Auth>
  );
}
