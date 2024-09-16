"use client";

import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import SearchIcon from "@mui/icons-material/Search";
import ProjectsToolbarModal from "./projects-toolbar-modal";

type ToolBarModalType = "PROJECTS" | "MEMBERS" | "TASKS" | null;

export default function WorkspaceToolbar() {
  const [isExpand, setExpand] = useState<boolean | null>(null);
  const [toolbarModalType, setToolbarModalType] =
    useState<ToolBarModalType>(null);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setExpand(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const openToolbarModal = (type: ToolBarModalType) => {
    setToolbarModalType(type);
    setExpand(true);
  };

  const renderToolbarModal = () => {
    switch (toolbarModalType) {
      case "PROJECTS":
        return <ProjectsToolbarModal />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        ref={ref}
        style={{
          left: "25%",
          transformOrigin: "bottom center",
          animation:
            isExpand !== null
              ? isExpand
                ? "scaleUp 0.3s ease-in-out forwards"
                : "scaleDown 0.3s ease-in-out forwards"
              : "scaleDown 0s forwards",
        }}
        className="fixed bottom-14 z-[1001] flex h-[50%] w-[50%] items-center rounded-2xl border-[1px] border-solid border-[--border-color] bg-[--primary] p-5 text-[--base] shadow-xl"
      >
                {renderToolbarModal()}
      </div>

      <div
        style={{
          left: "35%",
          transform: isExpand ? "scale(0)" : " scale(1)",
          transition: "all 0.25s ease-in-out",
          transformOrigin: "bottom center",
        }}
        className="fixed bottom-14 z-[1000] flex w-[30%] items-center gap-5 rounded-full border-[1px] border-solid border-[--border-color] bg-[--primary] px-5 py-2 text-[--base] shadow-2xl"
      >
        <div>
          <button
            onClick={() => openToolbarModal("PROJECTS")}
            className="rounded-lg p-2 hover:bg-[--hover-bg]"
          >
            <SearchIcon />
          </button>
        </div>
        <div>
          <button onClick={() => setExpand(true)}>Trigger</button>
        </div>
      </div>
    </>
  );
}
