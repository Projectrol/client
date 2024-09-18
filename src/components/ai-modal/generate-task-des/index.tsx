"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenAIModalResponse } from "@/services/redux/slices/app";
import { prompt as googlePrompt } from "@/app/actions/google-ai";
import { prompt as groqPrompt } from "@/app/actions/groq";
import Loading from "@/app/loading";
import { promptTemplate } from "@/app/actions/prompt-template";

export default function GenerateTaskDes({
  selectedModel,
}: {
  selectedModel: "groq" | "gemini";
}) {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [promptMsg, setPromptMsg] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const prompt = selectedModel === "gemini" ? googlePrompt : groqPrompt;
    const response = await prompt(promptMsg, promptTemplate.taskDescription);
    console.log({response});
    dispatch(setOpenAIModalResponse(response));
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="flex w-full flex-col">
      {isLoading && (
        <div className="absolute left-0 top-0 z-[100] flex h-full w-full cursor-wait items-center justify-center bg-[rgba(0,0,0,0.05)]">
          <Loading />
        </div>
      )}
      <div className="w-full px-6 pt-3 font-bold text-[--base]">
        Describe your task briefly
      </div>
      <div className="w-full flex-1 px-6">
        <textarea
          form="confirmationForm"
          value={promptMsg}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
              submit(e);
              return false;
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPromptMsg(e.target.value);
          }}
          className="my-2 h-full w-full bg-[--primary] text-sm text-[--base] opacity-80 outline-none"
          placeholder="Enter here..."
        />
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}
