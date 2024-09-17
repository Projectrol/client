"use client";

import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import SearchIcon from "@mui/icons-material/Search";
import SearchToolbarModal from "./search-toolbar-modal";

type ToolBarModalType = "SEARCH" | "MEMBERS" | "TASKS" | null;

export default function WorkspaceToolbar() {
  const [currentHoverTabIndex, setCurrentHoverTabIndex] = useState(-1);
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
      case "SEARCH":
        return <SearchToolbarModal />;
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
          transform: isExpand ? "scale(1)" : " scale(0)",
          transition: "all 0.25s ease-in-out",
        }}
        className="fixed bottom-12 z-[1001] flex h-[50%] w-[50%] items-center rounded-2xl border-[1px] border-solid border-[--border-color] bg-[--primary] py-5 text-[--base] shadow-xl"
      >
        {renderToolbarModal()}
      </div>

      <div
        style={{
          left: "50%",
          transform: isExpand
            ? "scale(0) translateX(-50%)"
            : " scale(1) translateX(-50%)",
          transition: "all 0.25s ease-in-out",
          transformOrigin: "bottom center",
        }}
        className="fixed bottom-14 z-[1000] flex h-[52px] items-center gap-0 overflow-hidden rounded-full border-[1px] border-solid border-[--border-color] bg-[--primary] px-2 py-4 text-[--base] shadow-2xl"
      >
        <div
          style={{
            opacity: currentHoverTabIndex !== -1 ? 1 : 0,
            height: "calc(100% - 12px)",
            top: "50%",
            transition:
              currentHoverTabIndex !== -1 ? "all 0.2s ease" : "all 0s ease",
            marginLeft: 0.6 + 2.4 * currentHoverTabIndex + "rem",
            transform: "translateY(-50%)",
          }}
          className="pointer-events-none absolute left-0 top-0 aspect-square rounded-full bg-[--hover-bg]"
        ></div>
        <div>
          <button
            onMouseLeave={() => setCurrentHoverTabIndex(-1)}
            onMouseEnter={() => setCurrentHoverTabIndex(0)}
            onClick={() => openToolbarModal("SEARCH")}
            className="aspect-square rounded-full p-2"
          >
            <SearchIcon />
          </button>
        </div>
        <div>
          <button
            onMouseLeave={() => setCurrentHoverTabIndex(-1)}
            onMouseEnter={() => setCurrentHoverTabIndex(1)}
            onClick={() => openToolbarModal("SEARCH")}
            className="aspect-square rounded-full p-2"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </>
  );
}
