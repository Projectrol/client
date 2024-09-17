"use client";

import Popover from "@/components/popover";
import { User } from "@/services/api/users-service";
import { openAIModal } from "@/services/redux/slices/app";
import { PluginElementRenderProps } from "@yoopta/editor";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function GenerateWithAIElement({
  attributes,
  children,
}: PluginElementRenderProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(openAIModal({ isOpen: true, type:"translate" }))
  }, [])

  return (
    <div
      {...attributes}
      className="flex relative"
      contentEditable={false}
    >
      {children}
    </div>
  );
}
