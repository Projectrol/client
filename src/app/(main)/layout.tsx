"use client";

import MainLayout from "@/components/layouts/main-layout";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Projects from "./projects/page";
import Inbox from "./inbox/page";
import CalendarPage from "./calendar/page";
import MyIssues from "./my-issues/page";
import Teams from "./teams/page";
import ProjectOverview from "./project/[slug]/overview/page";

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
    <MainLayout>
      <Suspense>{children}</Suspense>
    </MainLayout>
  );
}
