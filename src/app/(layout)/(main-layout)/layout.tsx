"use client";

import AIModal from "@/components/ai-modal";
import MainLayout from "@/components/layouts/main-layout";
import WorkspaceToolbar from "@/components/workspace-toolbar";
import { State } from "@/services/redux/store";
import { Suspense } from "react";
import { useSelector } from "react-redux";

export default function Layout({
  children,
  params,
}: Readonly<{
  params: any;
  children: React.ReactNode;
}>) {
  const aiModalState = useSelector((state: State) => state.app.aiModal)
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
      <Suspense>
        <>
        <div className="w-full h-full bg-[--secondary] shadow-md">
          {children}
        </div>
        <WorkspaceToolbar />
        {aiModalState.isOpen && <AIModal />}
        </>
      </Suspense>
    </MainLayout>
  );
}
