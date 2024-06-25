"use client";

import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";

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
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ProjectRole, User } from "@/db/repositories/users.repo";
import {
  CreateProjectInput,
  Project,
  CardStatus,
} from "@/db/repositories/projects.repo";
import { db } from "@/db";
import ProjectAttributesBar from "./project-attributes-bar";

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = reject;
  });

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

function ProjectEditor({
  onCancel,
  onCreated,
  initValue,
  mode = "create",
}: {
  onCancel?: () => void;
  onCreated?: () => void;
  initValue?: Project;
  mode?: "create" | "edit";
}) {
  const projectNameDivRef = useRef<HTMLDivElement>(null);
  const summaryDivRef = useRef<HTMLDivElement>(null);
  const [focusElement, setFocusElement] = useState("name");
  const [projectName, setProjectName] = useState(initValue?.name ?? "");
  const [status, setStatus] = useState<CardStatus>(
    initValue?.status ?? CardStatus.BACKLOG
  );
  const [summary, setSummary] = useState(initValue?.summary ?? "");
  const [startDate, setStartDate] = useState<Date | null>(
    initValue?.startDate ?? null
  );
  const [targetDate, setTargetDate] = useState<Date | null>(
    initValue?.targetDate ?? null
  );
  const [assignedMembers, setAssignedMembers] = useState<
    Array<{ role: ProjectRole } & User>
  >([]);
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);

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

  const TOOLS = {
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
    if (!initValue) return;
    if (projectNameDivRef.current) {
      projectNameDivRef.current.innerHTML = initValue.name;
    }
    if (summaryDivRef.current) {
      summaryDivRef.current.innerHTML = initValue.summary;
    }
  }, [initValue]);

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
      case "summary":
        if (summaryDivRef && summaryDivRef.current) {
          summaryDivRef.current.focus();
        }
        break;
      case "description":
        break;
    }
  }, [focusElement]);

  const checkIfExisted = (id: number) => {
    return assignedMembers.findIndex((m) => m.id === id) !== -1;
  };

  const handleAssignMember = (user: User) => {
    const isExisted = checkIfExisted(user.id);
    if (!isExisted) {
      setAssignedMembers((prev) => [
        ...prev,
        { ...user, role: ProjectRole.MEMBER },
      ]);
    } else {
      setAssignedMembers((prev) => prev.filter((m) => m.id !== user.id));
    }
  };

  const createProject = () => {
    if (!startDate || !targetDate) return;
    const input: CreateProjectInput = {
      name: projectNameDivRef.current?.innerText ?? "",
      summary: summaryDivRef.current?.innerText ?? "",
      description: JSON.stringify(editor.getEditorValue()),
      startDate,
      targetDate,
      status,
    };
    const response = db.projects.create(input);
    if (response) {
      onCreated && onCreated();
    }
  };

  return (
    <div className="w-[90%] h-[100%] flex flex-col mx-auto py-[20px]">
      <div className="w-full">
        <div
          ref={projectNameDivRef}
          contentEditable
          onKeyDownCapture={(e) => {
            if (e.key !== "Enter") {
              setProjectName((prev) => prev + e.key);
            } else {
              e.preventDefault();
              setFocusElement("summary");
            }
          }}
          style={{
            whiteSpace: "pre-wrap",
          }}
          className={clsx(
            {
              "`w-full text-[--base] font-semibold text-[1.5rem] outline-none before:text-[--text-header-color] before:opacity-75":
                true,
            },
            { "before:content-['Project_name']": projectName === "" },
            { "before:content-none": projectName !== "" }
          )}
        />

        <div
          style={{
            whiteSpace: "pre-wrap",
          }}
          ref={summaryDivRef}
          contentEditable
          autoFocus={focusElement === "summary"}
          onKeyDownCapture={(e) => {
            if (e.key !== "Enter") {
              setSummary((prev) => prev + e.key);
            } else {
              e.preventDefault();
              setFocusElement("description");
            }
          }}
          className={clsx(
            {
              "`w-full mt-[5px] text-[--base] font-medium text-[0.925rem] outline-none before:text-[--text-header-color] before:opacity-80":
                true,
            },
            {
              "before:content-['Add_a_short_summary_...']": summary === "",
            },
            { "before:content-none": summary !== "" }
          )}
        />
      </div>
      <div className="w-full flex flex-row flex-wrap gap-[10px] mt-[15px]">
        <ProjectAttributesBar
          status={status}
          startDate={startDate}
          targetDate={targetDate}
          assignedMembers={assignedMembers}
          setStartDate={setStartDate}
          setTargetDate={setTargetDate}
          handleAssignMember={handleAssignMember}
          checkIfExisted={checkIfExisted}
        />
      </div>
      <div className="w-full h-[1px] bg-[--border-color] mt-[20px]"></div>
      <div
        style={{
          height: "calc(100% - 150px)",
          overflowX: "auto",
        }}
        onClick={() => setFocusElement("description")}
        className="w-full mt-[15px]"
        ref={selectionRef}
      >
        <YooptaEditor
          style={{
            width: "100%",
            fontSize: "3rem",
          }}
          editor={editor}
          plugins={plugins}
          tools={TOOLS}
          marks={MARKS}
          value={
            initValue?.description ? JSON.parse(initValue.description) : null
          }
          autoFocus={focusElement === "description"}
          selectionBoxRoot={selectionRef}
          className={clsx(
            {
              "before:font-medium before:text-[--text-header-color] before:opacity-60 before:absolute":
                true,
            },
            {
              "before:content-['Write_a_description,_a_project_brief,_or_collect_ideas...']":
                focusElement !== "description" && !initValue,
            },
            {
              "before:content-none":
                focusElement === "description" || initValue,
            }
          )}
        />
      </div>
      {mode === "create" && (
        <div className="w-full h-[50px] border-t-solid flex flex-row items-center justify-end px-[15px] gap-[15px]">
          <button
            onClick={onCancel}
            className="bg-[--btn-cancel-bg] text-[--btn-cancel-color] text-[0.82rem] px-[15px] py-[5px] rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={createProject}
            className="bg-[--btn-ok-bg] text-[--btn-ok-color] text-[0.82rem] px-[15px] py-[5px] rounded-md"
          >
            Create project
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectEditor;
