"use client";

import YooptaEditor, { createYooptaEditor, Tools } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Accordion from "@yoopta/accordion";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { Label } from "@/services/api/tasks-services";
import { useEffect, useMemo, useRef, useState } from "react";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import { DefaultToolbarRender } from "@yoopta/toolbar";
import { Toolbar } from "@mui/material";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import clsx from "clsx";
import Button from "@/components/button";
import { BUTTON_TYPES } from "@/configs/themes";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import useProjectDocumentDetails from "@/services/rquery/queries/use-project-document-details";
import { ProjectsService } from "@/services/api/projects-service";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services/rquery/consts";

export default function CreateTaskModal() {
  const queryClient = useQueryClient();
  const [isDiff, setDiff] = useState(false);
  const workspaceSlice = useSelector(
    (state: State) => state.workspace.workspace
  );
  const [assignedUserId, setAssignedUserId] = useState<number | null>(null);
  const params = useParams();
  const { details, error, isLoading } = useProjectDocumentDetails(
    workspaceSlice?.general_information.id,
    params["slug"] as string,
    params["nanoid"] as string
  );
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const projectNameDivRef = useRef<HTMLDivElement>(null);
  const [focusElement, setFocusElement] = useState("name");
  const [projectName, setProjectName] = useState("");
  const [label, setLabel] = useState<Label>(Label.BUG);
  const [priority, setPriority] = useState(0);
  const plugins: any = [
    Paragraph,
    Accordion,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Blockquote,
    Callout,
    NumberedList,
    BulletedList,
    TodoList,
    Code,
    Link,
    Embed,
  ];

  const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

  const TOOLS: Partial<Tools> = {
    ActionMenu: {
      render: DefaultActionMenuRender,
      tool: ActionMenuList,
    },
    Toolbar: {
      render: DefaultToolbarRender,
      tool: Toolbar,
    },
    LinkTool: {
      render: DefaultLinkToolRender,
      tool: LinkTool,
    },
  };

  useEffect(() => {
    function handleChange(value: any) {
      setDiff(true);
    }
    editor.on("change", handleChange);
    return () => {
      editor.off("change", handleChange);
    };
  }, [editor]);

  useEffect(() => {
    if (details && projectName) {
      if (details.name !== projectName) {
        setDiff(true);
      }
    }
  }, [details, projectName, editor]);

  useEffect(() => {
    switch (focusElement) {
      case "name":
        if (projectNameDivRef && projectNameDivRef.current) {
          projectNameDivRef.current.focus();
        }
        break;
      case "content":
        break;
    }
  }, [focusElement]);

  useEffect(() => {
    if (details) {
      if (projectNameDivRef && projectNameDivRef.current) {
        setProjectName(details.name);
        projectNameDivRef.current.innerText = details.name;
      }
      if (projectNameDivRef && projectNameDivRef.current) {
        setProjectName(details.name);
        projectNameDivRef.current.innerText = details.name;
      }
    }
  }, [details]);

  const update = async () => {
    const projectSlug = params.slug as string;
    const workspaceId = workspaceSlice!.general_information.id;
    const nanoid = params.nanoid as string;
    const name = projectName.trim();
    const content = JSON.stringify(editor.getEditorValue());
    try {
      const response = await ProjectsService.UpdateProjectDocumentDetails(
        projectSlug,
        workspaceId,
        nanoid,
        name,
        content
      );
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USE_PROJECT_DOCUMENT_DETAILS],
      });
    } catch (err) {}
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-[50px] px-[50px]">
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
        }}
        className="w-full"
      >
        <div
          ref={projectNameDivRef}
          contentEditable
          onFocus={() => setFocusElement("name")}
          onClick={() => setFocusElement("name")}
          onKeyUp={(e) => {
            if (projectNameDivRef && projectNameDivRef.current) {
              setProjectName(projectNameDivRef.current.innerText.trim());
            }
          }}
          onKeyDownCapture={(e) => {
            if (e.key !== "Enter") {
              if (projectNameDivRef && projectNameDivRef.current) {
                setProjectName(projectNameDivRef.current.innerText.trim());
              }
            } else {
              e.preventDefault();
              setFocusElement("content");
            }
          }}
          style={{
            whiteSpace: "pre-wrap",
          }}
          className={clsx(
            {
              "`w-full sticky top-0 bg-[--secondary] z-[100] text-[--base] pl-[50px] pr-[20px] font-semibold text-[1.2rem] outline-none before:text-[--text-header-color] before:opacity-75":
                true,
            },
            { "before:content-['Task_title']": projectName === "" },
            { "before:content-none": projectName !== "" }
          )}
        />

        {details && !isLoading && (
          <div
            onClick={() => setFocusElement("content")}
            className="w-full flex items-start justify-start pt-[10px] pr-[60px] text-[--base]"
            ref={selectionRef}
          >
            <YooptaEditor
              style={{
                width: "100%",
                fontSize: "3rem",
                paddingBottom: "20px",
              }}
              width={"100%"}
              editor={editor}
              plugins={plugins}
              tools={TOOLS}
              key={editor.getEditorValue()}
              marks={MARKS}
              value={details?.content ? JSON.parse(details.content) : {}}
              autoFocus={focusElement === "content"}
              selectionBoxRoot={selectionRef}
              className={clsx(
                {
                  "before:font-medium before:text-[--text-header-color] before:opacity-60 before:absolute":
                    true,
                },
                {
                  "before:content-['Task_content...']":
                    focusElement !== "content" &&
                    Object.keys(editor.getEditorValue()).length === 1,
                },
                {
                  "before:content-none":
                    focusElement === "content" ||
                    Object.keys(editor.getEditorValue()).length > 1,
                }
              )}
            />
          </div>
        )}
      </div>
      <div className="fixed bottom-[50px] right-[50px] z-[100]">
        <Button
          type={BUTTON_TYPES.OK}
          style={{
            fontSize: "0.85rem",
            padding: "8px 12px",
            borderRadius: "6px",
            fontWeight: 600,
          }}
          // disabled={!isDiff}
          onClick={update}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
