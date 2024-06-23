"use client";

import LayersIcon from "@mui/icons-material/Layers";
import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import AddIcon from "@mui/icons-material/Add";
import useRouteInfo from "@/hooks/useRouteInfo";
import useModal from "@/hooks/useModal";
import Modal from "@/components/modal";
import ProjectEditor from "@/components/project-editor";
import { useEffect, useState } from "react";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Project } from "@/db/repositories/projects.repo";
import { db } from "@/db";
import ProjectsTable from "./projects-table";
import ProjectsTimeline from "./projects-timeline";
import { useSearchParams } from "next/navigation";
import useCustomRouter from "@/hooks/useCustomRouter";

const Projects = () => {
  const searchParams = useSearchParams();
  const { shallowPush } = useCustomRouter();
  const viewMode = searchParams.has("view_mode")
    ? (searchParams.get("view_mode") as "table" | "timeline")
    : "table";
  const {
    open: openModal,
    close: closeModal,
    isOpen: isOpenModal,
  } = useModal();
  const { title } = useRouteInfo();
  const [isLoadingProjects, setLoadingProjects] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [displayMode, setDisplayMode] = useState<"table" | "timeline">(
    viewMode
  );

  useEffect(() => {
    const getProjects = async () => {
      const response = await db.projects.getAllProjects();
      if (response) {
        setProjects(response);
      }
      setLoadingProjects(false);
    };
    getProjects();
  }, []);

  const handleOnCreated = async () => {
    closeModal();
    setLoadingProjects(true);
    const response = await db.projects.getAllProjects();
    if (response) {
      setProjects(response);
    }
    setLoadingProjects(false);
  };

  return (
    <div className="w-full flex flex-col h-full">
      <MainBodyHeader title={title}>
        <div className="flex-1 flex flex-row items-center ml-[10px]">
          <div className="w-[70%] flex flex-row">
            <div
              className="flex ml-[5px]
            border-solid border-[1px] border-[--border-color] overflow-hidden
            flex-row rounded-sm bg-[--primary] items-center justify-center h-[30px] "
            >
              <div
                onClick={() => {
                  shallowPush("/projects?view_mode=table");
                  setDisplayMode("table");
                }}
                style={{
                  background:
                    displayMode === "table" ? "var(--selected-bg)" : "none",
                }}
                className="h-[35px] text-[0.8rem] gap-[3px] text-[--base]
                font-medium flex items-center justify-center cursor-pointer px-[5px]"
              >
                <TableChartIcon
                  color="inherit"
                  fontSize="inherit"
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <div
                onClick={() => {
                  shallowPush("/projects?view_mode=timeline");
                  setDisplayMode("timeline");
                }}
                style={{
                  background:
                    displayMode === "timeline" ? "var(--selected-bg)" : "none",
                }}
                className="h-[35px] text-[0.8rem] gap-[3px] text-[--base]
                font-medium flex items-center justify-center cursor-pointer px-[5px]"
              >
                <CalendarMonthIcon
                  color="inherit"
                  fontSize="inherit"
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-[30%] flex items-center justify-end">
            <button
              onClick={() => openModal()}
              className="text-[1.2rem] w-[26px] h-[26px] flex items-center justify-center hover:bg-[--hover-bg] rounded-sm"
            >
              <AddIcon className="text-[--base]" fontSize="inherit" />
            </button>
          </div>
        </div>
      </MainBodyHeader>

      {displayMode === "table" && (
        <ProjectsTable loading={isLoadingProjects} projects={projects} />
      )}
      {displayMode === "timeline" && (
        <ProjectsTimeline loading={isLoadingProjects} projects={projects} />
      )}

      {!isLoadingProjects && projects.length === 0 && (
        <div className="w-full flex-1">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <LayersIcon
              htmlColor="var(--text-header-color)"
              style={{ fontSize: "8rem" }}
            />
            <div className="text-[--base] font-semibold text-[1.2rem] mt-[20px]">{`You don't have any project. Let's create one`}</div>
            <button
              onClick={() => openModal()}
              className="bg-[--btn-ok-bg] text-[--btn-ok-color] font-medium text-[0.8rem] px-[15px] py-[6px] rounded-md mt-[20px]"
            >
              New project
            </button>
          </div>
        </div>
      )}
      <Modal showFooter={false} isOpen={isOpenModal} close={closeModal}>
        <div className="w-[850px] h-[550px]">
          <ProjectEditor onCreated={handleOnCreated} onCancel={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
