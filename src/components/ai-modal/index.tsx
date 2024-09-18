"use client";

import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useDispatch, useSelector } from "react-redux";
import { closeAIModal } from "@/services/redux/slices/app";
import { State } from "@/services/redux/store";
import GenerateProjectDes from "./generate-project-des";
import GenerateTaskDes from "./generate-task-des";

export default function AIModal() {
  const [selectedModel, setSelectedModel] = useState<"groq" | "gemini">("groq");
  const aiModal = useSelector((state: State) => state.app.aiModal);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleClickOutside = () => {
    dispatch(closeAIModal());
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: aiModal.position.y,
        left: aiModal.position.x,
        zIndex: 100,
      }}
      className="top-0 mt-[50px] flex h-[220px] w-[350px] origin-top animate-scaleUp flex-col overflow-hidden rounded-xl bg-[--primary] py-4 shadow-2xl"
    >
      <div className="flex w-full items-center justify-between px-6 pb-3 shadow-md">
        <div
          onClick={() => setSelectedModel("groq")}
          style={
            selectedModel === "groq"
              ? {
                  background: "var(--selected-bg)",
                }
              : {}
          }
          className="flex w-[49%] cursor-pointer items-center justify-center rounded-md py-1 text-sm text-[--base] transition-all"
        >
          Groq
        </div>
        <div
          onClick={() => setSelectedModel("gemini")}
          style={
            selectedModel === "gemini"
              ? {
                  background: "var(--selected-bg)",
                }
              : {}
          }
          className="flex w-[49%] cursor-pointer items-center justify-center rounded-md py-1 text-sm text-[--base] transition-all"
        >
          Gemini
        </div>
      </div>
      {aiModal.type === "generate_project_des" && (
        <GenerateProjectDes selectedModel={selectedModel} />
      )}
        {aiModal.type === "generate_task_des" && (
        <GenerateTaskDes selectedModel={selectedModel} />
      )}
    </div>
  );
}
