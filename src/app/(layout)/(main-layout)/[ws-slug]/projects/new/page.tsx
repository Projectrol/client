"use client";

import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Accordion from "@yoopta/accordion";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
import {
  CreateProjectRequest,
  Project,
  ProjectsService,
} from "@/services/api/projects-service";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services/rquery/consts";
import { WorkspaceMember } from "@/services/api/workspaces-service";
import ProjectAttributesBar from "@/components/project-editor/project-attributes-bar";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { BUTTON_TYPES } from "@/configs/themes";
import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import { closeAIModal } from "@/services/redux/slices/app";
import GenerateProjectDesAIPlugin from "@/components/yoopta/custom-plugins/generate-project-des-ai";

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = reject;
  });

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

function NewProject({
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
  const dispatch = useDispatch();
  const aiModal = useSelector((state: State) => state.app.aiModal);
  const router = useRouter();
  const queryClient = useQueryClient();
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const projectNameDivRef = useRef<HTMLDivElement>(null);
  const summaryDivRef = useRef<HTMLDivElement>(null);
  const [focusElement, setFocusElement] = useState("name");
  const [projectName, setProjectName] = useState(initValue?.name ?? "");
  const [status, setStatus] = useState("Backlog");
  const [summary, setSummary] = useState(initValue?.description ?? "");
  const [isPrivate, setPrivate] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    initValue?.dtstart ? new Date(initValue.dtstart) : null,
  );
  const [targetDate, setTargetDate] = useState<Date | null>(
    initValue?.dtend ? new Date(initValue?.dtend) : null,
  );
  const [assignedMembers, setAssignedMembers] = useState<WorkspaceMember[]>([]);
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
    GenerateProjectDesAIPlugin,
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

  const handleAssignMember = (user: WorkspaceMember) => {
    const isExisted = checkIfExisted(user.id);
    if (!isExisted) {
      setAssignedMembers((prev) => [...prev, { ...user, role: "MEMBER" }]);
    } else {
      setAssignedMembers((prev) => prev.filter((m) => m.id !== user.id));
    }
  };

  const createProject = async () => {
    if (!startDate || !targetDate || !workspaceSlice.workspace) return;
    const input: CreateProjectRequest = {
      name: projectName,
      summary,
      description: JSON.stringify(editor.getEditorValue()),
      dtstart: moment(startDate).utc().unix(),
      dtend: moment(targetDate).utc().unix(),
      workspace_id: workspaceSlice.workspace.general_information.id,
      is_private: isPrivate,
    };
    const response = await ProjectsService.CreateProject(
      input.workspace_id,
      input,
    );
    if (response.status === "success") {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USE_PROJECTS] });
      router.push(
        `/${workspaceSlice.workspace?.general_information.slug}/projects?view_mode=table`,
      );
    }
  };

  useEffect(() => {
    if (aiModal.response && aiModal.type.toString() === "generate_project_des") {
      editor.insertBlock({
        id: "e339dea6-d20d-45c0-a1d7-e12823793713",
        value: [
          {
            id: "23cf6a14-45c9-4176-b6be-9607a84909b2",
            type: "paragraph",
            children: [
              {
                text: aiModal.response,
              },
            ],
            props: {
              nodeType: "block",
            },
          },
        ],
        type: "Paragraph",
        meta: {
          order: 0,
          depth: 0,
        },
      });
      dispatch(closeAIModal());
    }
  }, [aiModal.response]);

  return (
    <div className="w-[90%] overflow-y-auto">
      <MainBodyHeader
        title=""
        topLeftElement={
          <div className="flex items-center gap-[2px] py-[15px]">
            <button
              className="text-[--base]"
              onClick={() =>
                router.push(
                  `/${workspaceSlice.workspace?.general_information.slug}/projects?view_mode=table`,
                )
              }
            >
              <ArrowBackIosIcon
                fontSize="inherit"
                style={{ fontSize: "1rem" }}
              />
            </button>
            Create New Project
          </div>
        }
      />
      <div className="flex w-[100%] flex-wrap justify-between px-[40px] pt-[20px]">
        <div className="mb-[20px] flex w-[49%] flex-col gap-[10px]">
          <div className="w-full text-[0.9rem] font-semibold text-[--base]">
            Project name
          </div>
          <div className="w-full">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter name of the project"
              className="w-full rounded-sm bg-[--selected-bg] px-[10px] py-[8px] text-[0.9rem] text-[--base] shadow-sm outline-none"
            />
          </div>
        </div>
        <div className="mb-[20px] flex w-[49%] flex-col gap-[10px]">
          <div className="w-full text-[0.9rem] font-semibold text-[--base]">
            Summary
          </div>
          <div className="w-full">
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter project's summary"
              className="w-full rounded-sm bg-[--selected-bg] px-[10px] py-[8px] text-[0.9rem] text-[--base] shadow-sm outline-none"
            />
          </div>
        </div>
        <div className="mb-[10px] w-full text-[0.9rem] font-semibold text-[--base]">
          Date
        </div>
        <div className="mb-[20px] w-[100%]">
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
        <div className="mb-[10px] w-full text-[0.9rem] font-semibold text-[--base]">
          Description
        </div>
        <div
          style={{
            minHeight:"250px",
            maxHeight: "500px",
            overflowY: "auto",
          }}
          onClick={() => setFocusElement("description")}
          className="mb-[15px] w-[100%] rounded-sm bg-[--selected-bg] px-[10px] text-[--base] shadow-sm"
          ref={selectionRef}
        >
          <YooptaEditor
            style={{
              width: "100%",
              position: "relative",
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
                "before:absolute before:font-medium before:text-[--text-header-color] before:opacity-60":
                  true,
              },
              {
                "before:content-['Write_a_description,_a_project_brief,_or_collect_ideas...']":
                  focusElement !== "description" && !initValue,
              },
              {
                "before:content-none":
                  focusElement === "description" || initValue,
              },
            )}
          />
        </div>
        <div className="flex w-[100%] items-center gap-[8px] text-[0.95rem] text-[--base]">
          <input
            checked={isPrivate}
            onChange={(e) => setPrivate(!isPrivate)}
            type="checkbox"
            className="h-[16px] w-[16px]"
          />
          Restricted access to members only
        </div>
        <div className="mt-[30px] flex w-full flex-1 items-center justify-end">
          <Button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
            type={BUTTON_TYPES.OK}
            onClick={createProject}
          >
            Create project
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewProject;
