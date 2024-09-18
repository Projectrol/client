"use client";

import Popover from "@/components/popover";
import { User } from "@/services/api/users-service";
import { openAIModal } from "@/services/redux/slices/app";
import { PluginElementRenderProps } from "@yoopta/editor";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function GenerateTaskDesAIElement({
  attributes,
  children,
}: PluginElementRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { x, y } = rect;
      dispatch(
        openAIModal({ isOpen: true, type: "generate_task_des", position: { x, y } }),
      );
    }
  }, []); 

  return (
    <div
      {...attributes}
      ref={containerRef}
      className="relative flex"
      contentEditable={false}
    >
      {children}
    </div>
  );
}
