"use client";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PageRenderByPermission from "@/components/authorization/page-render-by-permission";
import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import { State } from "@/services/redux/store";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Popover from "@/components/popover";
import { createContext, useRef, useState } from "react";
import Drawer from "@/components/drawer";
import { ProjectDetails } from "@/services/api/projects-service";
import useProjectDetails from "@/services/rquery/hooks/use-project-details";
import useProjectTasks from "@/services/rquery/hooks/use-project-tasks";

type ProjectDetailsContext = {
  details: ProjectDetails | null;
  tasks: any[];
};

export const ProjectDetailsContext = createContext<ProjectDetailsContext>({
  details: null,
  tasks: [],
});

export default function Layout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { slug: string } }>) {
  const [isOpenMembersPopup, setOpenMembersPopup] = useState(false);
  const [isOpenOptionMenu, setOpenOptionMenu] = useState(false);
  const anchorEle = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const viewMode = pathname.split("/").slice(-1)[0];
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const router = useRouter();
  const { details, error, isLoading } = useProjectDetails(
    workspaceSlice.workspace,
    params.slug
  );
  const { tasks, getProjectTasksError, isLoadingProjectTasks } =
    useProjectTasks(
      workspaceSlice.workspace?.general_information.id,
      params.slug
    );
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
              onClick={() =>
                router.push(
                  `/${workspaceSlice.workspace?.general_information.slug}/projects?view_mode=table`
                )
              }
              className="select-none text-[--base] cursor-pointer hover:underline"
            >
              {workspaceSlice.workspace.general_information.name}
            </span>
            <ChevronRightIcon fontSize="small" htmlColor="var(--base)" />
            <span className="select-none text-[--base] capitalize">
              {projectName}
            </span>
          </>
        )}
        <div className="text-[0.8rem] text-[--base] font-semibold rounded-md">
          <div
            onClick={() => setOpenOptionMenu(!isOpenOptionMenu)}
            ref={anchorEle}
            className="w-[25px] h-[25px] rounded-sm flex items-center justify-center mx-[10px] cursor-pointer hover:bg-[--hover-bg]"
          >
            <MoreHorizIcon
              fontSize="inherit"
              color="inherit"
              style={{ fontSize: "1.1rem", color: "var(--base)" }}
            />
          </div>
          <Popover
            onClickOutside={() => setOpenOptionMenu(false)}
            autoFocus
            position="bottom"
            open={isOpenOptionMenu}
            anchorEle={anchorEle.current}
            style={{
              marginTop: "5px",
              overflow: "hidden",
            }}
          >
            <div className="w-[200px] bg-[--primary] flex flex-col">
              <div
                onClick={() => setOpenMembersPopup(true)}
                className="w-full cursor-pointer hover:bg-[--hover-bg] py-[8px] px-[10px] text-[--base]"
              >
                Manage members
              </div>
              <div className="w-full h-[1px] bg-[--selected-bg]" />
              <div className="w-full cursor-pointer hover:bg-[--hover-bg] py-[8px] px-[10px] text-[--btn-delete-bg]">
                Delete
              </div>
            </div>
          </Popover>
        </div>
        <div
          style={{
            background:
              viewMode === "overview" ? "var(--selected-bg)" : "transparent",
          }}
          className="text-[0.8rem] py-[4px] px-[10px] text-[--base] font-semibold rounded-md mr-[10px] ml-[20px]"
        >
          <button
            onClick={() =>
              router.push(
                `/${workspaceSlice.workspace?.general_information.slug}/projects/${params.slug}/overview`
              )
            }
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
          onClick={() =>
            router.push(
              `/${workspaceSlice.workspace?.general_information.slug}/projects/${params.slug}/board`
            )
          }
        >
          Board
        </button>
      </div>
    );
  };

  return (
    <PageRenderByPermission>
      <ProjectDetailsContext.Provider
        value={{
          details,
          tasks,
        }}
      >
        <div className="w-full h-full flex flex-col">
          <MainBodyHeader
            leftStyle={{ padding: "15px 0" }}
            topLeftElement={renderTopLeftHeader()}
          />
          {children}
        </div>
      </ProjectDetailsContext.Provider>
    </PageRenderByPermission>
  );
}
