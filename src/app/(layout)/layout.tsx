"use client";

import Auth from "../auth";
import PermissionsProvider from "../../components/authorization/permissions-provider";
import ThemeProvider from "./theme-provider";
import WorkspacesProvider from "./workspaces-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Auth>
      <WorkspacesProvider>
        <PermissionsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PermissionsProvider>
      </WorkspacesProvider>
    </Auth>
  );
}
