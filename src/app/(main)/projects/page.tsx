"use client";

import LayersIcon from "@mui/icons-material/Layers";
import useModal from "@/hooks/useModal";
import Modal from "@/components/modal";
import ProjectEditor from "@/components/project-editor";
import { useState } from "react";
import ProjectsTable from "./components/projects-table";
import { useSearchParams } from "next/navigation";
import ProjectsHeader from "./components/header";
import useProjects from "@/services/rquery/hooks/useProjects";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services/rquery/consts";
import Timeline from "./components/timeline";

const Projects = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const viewMode = searchParams.has("view_mode")
    ? (searchParams.get("view_mode") as "table" | "timeline")
    : "table";
  const {
    open: openModal,
    close: closeModal,
    isOpen: isOpenModal,
  } = useModal();
  const { projects, isLoadingProjects } = useProjects();
  const [displayMode, setDisplayMode] = useState<"table" | "timeline">(
    viewMode
  );

  const handleOnCreated = async () => {
    closeModal();
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USE_PROJECTS] });
  };

  return (
    <div className="relative w-full flex flex-col h-full">
      <ProjectsHeader
        displayMode={displayMode}
        onClickAddIcon={openModal}
        setDisplayMode={setDisplayMode}
      />

      {displayMode === "table" && (
        <ProjectsTable loading={isLoadingProjects} projects={projects} />
      )}
      {displayMode === "timeline" && (
        <div className="w-full h-full flex flex-col">
          <Timeline projects={projects} />
        </div>
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
