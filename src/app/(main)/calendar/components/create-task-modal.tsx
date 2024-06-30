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
import Popover from "@/components/popover";
import moment from "moment";
import { DatePicker } from "@/components/date-picker";
import DurationInput from "@/components/duration-input";
import RecurringInput from "@/components/recurring-input";
import AssignPersonPlugin from "@/components/yoopta/custom-plugins/assign-person";

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export default function CreateTaskModal({
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
  const [isOpenDatePopover, setOpenDatePopover] = useState(false);
  const [anchorEle, setAnchorEle] = useState<HTMLDivElement | null>(null);
  const [focusElement, setFocusElement] = useState("name");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<CardStatus>(
    initValue?.status ?? CardStatus.BACKLOG
  );
  const [date, setDate] = useState<Date>(new Date());
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
    AssignPersonPlugin,
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
    function handleChange(value: any) {
      console.log(value);
    }
    editor.on("change", handleChange);
    return () => {
      editor.off("change", handleChange);
    };
  }, [editor]);

  const checkIfExisted = (id: number) => {
    return assignedMembers.findIndex((m) => m.id === id) !== -1;
  };

  return (
    <div className="w-[100%] h-[100%] flex flex-col mx-auto">
      <div className="w-full h-[1px] bg-[--border-color] mt-[20px]"></div>
      <div className="w-full h-[88%] flex flex-row px-[25px] pt-[15px]">
        <div className="h-full w-[65%] flex flex-col gap-[15px] px-[10px] py-[5px]">
          <div className="w-full flex items-center gap-[10px]">
            <div className="w-[15%] text-[0.825rem] text-[--base] font-medium">
              Date
            </div>
            <div className="flex-1 flex items-center gap-[10px]">
              <div
                onClick={(e) => {
                  setAnchorEle(e.currentTarget);
                  setOpenDatePopover(true);
                }}
                className="w-[100px] text-center rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color]
                  text-[0.8rem] py-[6px] select-none hover:bg-[--hover-bg]"
              >
                {!date ? "Target date" : moment(date).format("MMM DD, YYYY")}
              </div>
              <div>
                <select
                  className="w-[60px] text-center rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color] outline-none
                  text-[0.8rem] py-[6px] select-none hover:bg-[--hover-bg]"
                >
                  {Array(24)
                    .fill("")
                    .map((_, i) => (
                      <option key={i} value={i}>
                        {i < 10 && "0"}
                        {i}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <select
                  className="w-[60px] text-center rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color] outline-none
                  text-[0.8rem] py-[6px] select-none hover:bg-[--hover-bg]"
                >
                  {Array(60)
                    .fill("")
                    .map((_, i) => (
                      <option key={i} value={i}>
                        {i < 10 && "0"}
                        {i}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <Popover
            onClickOutside={() => {
              setAnchorEle(null);
              setOpenDatePopover(false);
            }}
            anchorEle={anchorEle}
            open={isOpenDatePopover}
            position="bottom"
            style={{
              marginTop: "3px",
            }}
          >
            <DatePicker
              value={date}
              onSelect={(val) => {
                setDate(val);
                setOpenDatePopover(false);
              }}
            />
          </Popover>

          <div className="w-full flex items-center gap-[10px]">
            <div className="w-[15%] text-[0.825rem] text-[--base] font-medium">
              Duration
            </div>
            <div className="flex-1 flex items-center gap-[15px]">
              <div className="flex-1">
                <DurationInput />
              </div>
              <div className="w-[200px] text-[0.85rem] text-[--base] flex items-center gap-[5px]">
                <input type="checkbox" className="w-[14px] aspect-square" />
                Recurring
              </div>
            </div>
          </div>

          <div className="w-full flex items-center gap-[10px]">
            <div className="w-[15%] text-[0.825rem] text-[--base] font-medium">
              Repeating
            </div>
            <div className="flex-1 flex items-center gap-[15px]">
              <RecurringInput />
            </div>
          </div>

          <div className="w-full flex items-center gap-[10px]">
            <div className="w-[15%] text-[0.825rem] text-[--base] font-medium">
              Title
            </div>
            <div className="flex-1">
              <input
                onClick={() => setFocusElement("title")}
                className="w-[90%] border-solid border-[1px] outline-none text-[0.9rem]
              rounded-md border-[--border-color] px-[10px] py-[8px] focus:border-[--text-header-color]"
                placeholder="Title"
              />
            </div>
          </div>

          <div className="w-full flex-1 flex items-start gap-[10px]">
            <div className="w-[15%] text-[0.825rem] text-[--base] font-medium">
              Description
            </div>
            <div className="w-[85%]">
              <div
                style={{
                  height: "100%",
                  overflowX: "auto",
                  border:
                    focusElement === "description"
                      ? "1px solid var(--text-header-color)"
                      : "1px solid var(--border-color)",
                }}
                onClick={() => setFocusElement("description")}
                onBlur={() => setFocusElement("")}
                className="w-[90%] rounded-md px-[15px] pt-[5px] box-border"
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
                  selectionBoxRoot={selectionRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex-col">
          <div className="w-full pb-[5px]">
            <div className="text-[--base] font-medium text-[0.825rem]">
              Participants
            </div>
          </div>
          <div className="w-full h-[1px] bg-[--border-color]" />
        </div>
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
            onClick={() => {}}
            className="bg-[--btn-ok-bg] text-[--btn-ok-color] text-[0.82rem] px-[15px] py-[5px] rounded-md"
          >
            Create task
          </button>
        </div>
      )}
    </div>
  );
}
