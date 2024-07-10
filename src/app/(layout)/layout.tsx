"use client";

import Auth from "../auth";
import RoleProvider from "./role-provider";
import ThemeProvider from "./theme-provider";
import WorkspacesProvider from "./workspaces-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Auth>
      <WorkspacesProvider>
        <RoleProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RoleProvider>
      </WorkspacesProvider>
    </Auth>
  );
}
