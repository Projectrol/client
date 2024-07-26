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
import { CardStatus, Label } from "@/services/api/tasks-services";
import { useEffect, useMemo, useRef, useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";
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
import axios from "axios";
import TaskAttributesBar from "./task-attribute-bar";

export default function CreateTaskModal({
  isOpen,
  initStatus,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  initStatus: CardStatus;
}) {
  const workspaceSlice = useSelector(
    (state: State) => state.workspace.workspace
  );
  const [assignedUserId, setAssignedUserId] = useState<number | null>(null);
  const params = useParams();
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const projectNameDivRef = useRef<HTMLDivElement>(null);
  const [focusElement, setFocusElement] = useState("name");
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState<CardStatus>(initStatus);
  const [label, setLabel] = useState<Label>(Label.BUG);
  const [priority, setPriority] = useState(0);
  const [isExpanded, setExpanded] = useState(false);
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
      props: {},
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
    setStatus(initStatus);
  }, [initStatus]);

  useEffect(() => {
    function handleChange(value: any) {
      console.log(value);
    }
    editor.on("change", handleChange);
    return () => {
      editor.off("change", handleChange);
    };
  }, [editor]);

  useEffect(() => {
    switch (focusElement) {
      case "name":
        if (projectNameDivRef && projectNameDivRef.current) {
          projectNameDivRef.current.focus();
        }
        break;
      case "description":
        break;
    }
  }, [focusElement]);

  const createTask = async () => {
    const body = {
      project_slug: params["slug"],
      title: projectNameDivRef.current?.innerText,
      description: JSON.stringify(editor.getEditorValue()),
      status,
      label,
      is_published: true,
    };
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/workspaces/${workspaceSlice?.general_information.id}/tasks`;
    await axios.post(url, body, {
      withCredentials: true,
    });
    console.log({ body });
    // ProjectSlug string `json:"project_slug"`
    // Title       string `json:"title"`
    // Description string `json:"description"`
    // Status      string `json:"status"`
    // Label       string `json:"label"`
    // IsPublished bool   `json:"is_published"`
  };

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
      className="w-full h-full fixed top-0 left-0 z-[100] flex items-start justify-center"
    >
      <div
        style={{
          transform: isOpen ? "scale(1)" : "scale(0)",
          opacity: isOpen ? 1 : 0,
          transformOrigin: "top left",
          transition: !isExpanded
            ? "transform 0.2s ease, min-height 0.25s ease, width 0.25s ease 0.25s, margin-top 0.25s ease, opacity 0.25s ease"
            : "transform 0.2s ease, min-height 0.25s ease 0.25s, width 0.25s ease, margin-top 0.25s ease 0.25s, opacity 0.25s ease",

          width: isExpanded ? "calc(60%)" : "50%",
          marginTop: isExpanded
            ? "calc((100vh - 625px) / 2)"
            : "calc((100vh - 550px) / 2)",
        }}
        className="bg-[--modal-bg] rounded-md shadow-lg flex flex-col py-[5px]"
      >
        <div className="w-full flex justify-end gap-[10px] mt-[5px]  pr-[30px]">
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
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
          className="w-full mt-[10px] pr-[30px]"
        >
          <div
            ref={projectNameDivRef}
            contentEditable
            onFocus={() => setFocusElement("name")}
            onClick={() => setFocusElement("name")}
            onKeyDownCapture={(e) => {
              if (e.key !== "Enter") {
                setProjectName((prev) => prev + e.key);
              } else {
                e.preventDefault();
                setFocusElement("description");
              }
            }}
            style={{
              whiteSpace: "pre-wrap",
            }}
            className={clsx(
              {
                "`w-full sticky top-0 bg-[--modal-bg] z-[100] text-[--base] pl-[50px] pr-[20px] font-semibold text-[1.2rem] outline-none before:text-[--text-header-color] before:opacity-75":
                  true,
              },
              { "before:content-['Task_title']": projectName === "" },
              { "before:content-none": projectName !== "" }
            )}
          />

          <div
            style={{
              transition: !isExpanded
                ? "transform 0.2s ease, min-height 0.25s ease, width 0.25s ease 0.25s, margin-top 0.25s ease, opacity 0.25s ease"
                : "transform 0.2s ease, min-height 0.25s ease 0.25s, width 0.25s ease, margin-top 0.25s ease 0.25s, opacity 0.25s ease",
              minHeight: isExpanded ? "540px" : "50px",
              maxHeight: isExpanded ? "auto" : "200px",
            }}
            onClick={() => setFocusElement("description")}
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
              value={{}}
              autoFocus={focusElement === "description"}
              selectionBoxRoot={selectionRef}
              className={clsx(
                {
                  "before:font-medium before:text-[--text-header-color] before:opacity-60 before:absolute":
                    true,
                },
                {
                  "before:content-['Task_description...']":
                    focusElement !== "description" &&
                    Object.keys(editor.getEditorValue()).length === 1,
                },
                {
                  "before:content-none":
                    focusElement === "description" ||
                    Object.keys(editor.getEditorValue()).length > 1,
                }
              )}
            />
          </div>
        </div>
        <div className="w-full pl-[50px] pb-[15px]">
          <TaskAttributesBar
            status={status}
            setStatus={setStatus}
            label={label}
            setLabel={setLabel}
            priority={priority}
            setPriority={setPriority}
          />
        </div>
        <div className="w-full h-[1px] bg-[--border-color]" />
        <div className="w-full flex items-center justify-end px-[20px] pt-[10px] pb-[5px]">
          <Button
            type={BUTTON_TYPES.OK}
            style={{
              fontWeight: 600,
              fontSize: "0.8rem",
              padding: "6px 15px",
              borderRadius: "5px",
            }}
            onClick={createTask}
          >
            Create task
          </Button>
        </div>
      </div>
    </div>
  );
}
