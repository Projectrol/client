"use client";

import { CardStatus } from "@/services/api/tasks-services";
import { useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateTaskModal({
  isOpen,
  initStatus,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  initStatus: CardStatus;
}) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{
        transition: isOpen
          ? "background 0.5s ease"
          : "background 0.5s ease, visibility 0s ease 0.5s",
        visibility: isOpen ? "visible" : "hidden",
        background: isOpen ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
        pointerEvents: isOpen ? "auto" : "none",
      }}
      className="w-full h-full fixed top-0 left-0 z-[1000] flex items-start justify-center"
    >
      <div
        style={{
          transition: isExpanded
            ? "transform 0.2s ease, height 0.25s ease, width 0.25s ease 0.25s, margin-top 0.25s ease, opacity 0.25s ease"
            : "transform 0.2s ease, height 0.25s ease 0.25s, width 0.25s ease, margin-top 0.25s ease 0.25s, opacity 0.25s ease",
          transform: isOpen ? "scale(1)" : "scale(0)",
          opacity: isOpen ? 1 : 0,
          transformOrigin: "top left",
          height: isExpanded ? "625px" : "250px",
          width: isExpanded ? "calc(60%)" : "50%",
          marginTop: isExpanded
            ? "calc((100vh - 625px) / 2)"
            : "calc((100vh - 550px) / 2)",
        }}
        className="bg-[--modal-bg] rounded-md shadow-md flex flex-col px-[10px] py-[5px]"
      >
        <div className="w-full flex justify-end gap-[10px]">
          <button
            onClick={() => setExpanded(!isExpanded)}
            className="text-[1.3rem] text-[--base]"
          >
            {isExpanded ? (
              <FullscreenExitIcon fontSize="inherit" color="inherit" />
            ) : (
              <FullscreenIcon fontSize="inherit" color="inherit" />
            )}
          </button>
          <button
            onClick={() => onClose()}
            className="text-[1.3rem] text-[--base]"
          >
            <CloseIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
      </div>
    </div>
  );
}
