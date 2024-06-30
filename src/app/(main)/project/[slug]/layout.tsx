"use client";

import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import { State } from "@/services/redux/store";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Layout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { slug: string } }>) {
  const pathname = usePathname();
  const viewMode = pathname.split("/").slice(-1)[0];
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const router = useRouter();
  const projectName = params.slug
    .split("-")
    .slice(0, -2)
    .reduce((totalStr, currStr) => `${totalStr} ${currStr}`, "");

  const renderTopLeftHeader = () => {
    return (
      <div className="w-full flex py-[5px] items-center">
        {workspaceSlice.workspace && (
          <>
            <span
              onClick={() => router.push("/projects?view_mode=table")}
              className="select-none text-[--base] cursor-pointer hover:underline"
            >
              {workspaceSlice.workspace.name}
            </span>
            <ChevronRightIcon fontSize="small" htmlColor="var(--base)" />
            <span className="select-none text-[--base] capitalize">
              {projectName}
            </span>
          </>
        )}
        <div
          style={{
            background:
              viewMode === "overview" ? "var(--selected-bg)" : "transparent",
          }}
          className="text-[0.8rem] py-[4px] px-[10px] text-[--base] font-semibold rounded-md ml-[20px] mr-[10px]"
        >
          <button
            onClick={() => router.push(`/project/${params.slug}/overview`)}
          >
            Overview
          </button>
        </div>
        <button
          style={{
            background:
              viewMode === "board" ? "var(--selected-bg)" : "transparent",
          }}
          className="text-[0.8rem] py-[4px] px-[10px] text-[--base] font-semibold rounded-md"
          onClick={() => router.push(`/project/${params.slug}/board`)}
        >
          Board
        </button>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <MainBodyHeader
        leftStyle={{ padding: "15px 0" }}
        topLeftElement={renderTopLeftHeader()}
      />
      {children}
    </div>
  );
}
