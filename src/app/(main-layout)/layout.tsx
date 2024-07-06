"use client";

import MainLayout from "@/components/layouts/main-layout";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Projects from "./[ws-slug]/projects/page";
import Inbox from "./[ws-slug]/inbox/page";
import CalendarPage from "./[ws-slug]/calendar/page";
import MyIssues from "./[ws-slug]/my-issues/page";
import Teams from "./[ws-slug]/teams/page";
import ProjectOverview from "./[ws-slug]/project/[slug]/overview/page";
import WorkspacesProvider from "../workspaces-provider";
import Auth from "../auth";
import ThemeProvider from "../theme-provider";

export default function Layout({
  children,
  params,
}: Readonly<{
  params: any;
  children: React.ReactNode;
}>) {
  // const pathName = usePathname();
  // const [pageToBeRendered, setPageToBeRendered] =
  //   useState<React.ReactElement | null>(null);

  // useEffect(() => {
  //   const handleDeepRoute = () => {
  //     if (pathName.split("/")[1].includes("project")) {
  //       setPageToBeRendered(<ProjectOverview params={params} />);
  //     }
  //   };

  //   switch (pathName) {
  //     case "/inbox":
  //       setPageToBeRendered(<Inbox />);
  //       break;
  //     case "/projects":
  //       setPageToBeRendered(<Projects />);
  //       break;
  //     case "/calendar":
  //       setPageToBeRendered(<CalendarPage />);
  //       break;
  //     case "/my-issues":
  //       setPageToBeRendered(<MyIssues />);
  //       break;
  //     case "/teams":
  //       setPageToBeRendered(<Teams />);
  //       break;
  //     default:
  //       handleDeepRoute();
  //       break;
  //   }
  // }, [pathName]);

  return (
    <Auth>
      <WorkspacesProvider>
        <ThemeProvider>
          <MainLayout>
            <Suspense>{children}</Suspense>
          </MainLayout>
        </ThemeProvider>
      </WorkspacesProvider>
    </Auth>
  );
}
