"use client";

import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import SearchIcon from "@mui/icons-material/Search";
import SearchToolbarModal from "./search-toolbar-modal";
import { useDispatch, useSelector } from "react-redux";
import { openAIModal } from "@/services/redux/slices/app";
import { State } from "@/services/redux/store";

type ToolBarModalType = "SEARCH" | "MEMBERS" | "TASKS" | null;

export default function AIModal() {
  const aiModal = useSelector((state: State) => state.app.aiModal);
  const dispatch = useDispatch();
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
    <div
      onClick={() => dispatch(openAIModal({ ...aiModal, isOpen: false }))}
      className="fixed left-0 top-0 z-[1001] flex h-screen w-screen items-start justify-end"
    >
      <div 
      onClick={(e) => e.stopPropagation()}
      className="h-screen w-[25%] bg-[white] shadow-2xl"></div>
    </div>
  );
}
