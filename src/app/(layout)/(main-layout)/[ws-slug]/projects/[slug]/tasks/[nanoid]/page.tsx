"use client";

import YooptaEditor, { createYooptaEditor, Tools } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Accordion from "@yoopta/accordion";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import Code from "@yoopta/code";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { DefaultToolbarRender } from "@yoopta/toolbar";
import { Toolbar } from "@mui/material";
import { State } from "@/services/redux/store";
import useProjectTaskDetails from "@/services/rquery/queries/use-project-task-details";
import moment from "moment";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { TaskLog } from "@/services/api/tasks-services";

export default function TaskDetails({
  params,
}: {
  params: { nanoid: string; slug: string };
}) {
  const editor = useMemo(() => createYooptaEditor(), []);
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const { details, error, isLoading } = useProjectTaskDetails(
    workspaceSlice.workspace?.general_information.id,
    params.slug,
    params.nanoid
  );

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

  const getProccessedTaskLogs = () => {
    if (!details) return [];
    const taskLogs: { [key: string]: TaskLog } = {};
    details.task_logs.forEach((tLog) => {
      const date = moment(tLog.created_at).date();
      const month = moment(tLog.created_at).month();
      const createdBy = tLog.created_by;
      const changedField = tLog.changed_field;
      const key = `${date}-${month}-${createdBy}-${changedField}`;
      if (taskLogs[key]) {
        const logCreatedAt = new Date(tLog.created_at).getTime();
        const currentKeyCreatedAt = new Date(
          taskLogs[key].created_at
        ).getTime();
        if (currentKeyCreatedAt < logCreatedAt) {
          taskLogs[key] = tLog;
        }
      } else {
        taskLogs[key] = tLog;
      }
    });
    const logsArr = Object.keys(taskLogs).map((key) => taskLogs[key]) ?? [];
    return logsArr;
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-[50px] py-[50px] flex flex-col">
        <div className="w-full text-[--base] font-semibold text-[1.7rem]">
          {details?.task.title}
        </div>
        <div className="w-full text-[--base] font-medium text-[0.95rem] pt-[20px]">
          <div className="w-full flex items-start justify-start pt-[10px] pr-[60px] text-[--base]">
            {details && (
              <YooptaEditor
                style={{
                  width: "100%",
                  fontSize: "3rem",
                  paddingBottom: "20px",
                }}
                marks={MARKS}
                width={"100%"}
                editor={editor}
                plugins={plugins}
                key={editor.getEditorValue()}
                value={JSON.parse(details.task.description)}
              />
            )}
          </div>
        </div>
        <div className="w-full h-[1px] bg-[--border-color] " />
        <div className="w-full text-[--base] font-semibold pt-[20px]">
          Activities
        </div>
        <div className="w-full flex flex-col py-[10px] pb-[100px]">
          {details &&
            details.task_logs?.length > 0 &&
            getProccessedTaskLogs &&
            getProccessedTaskLogs().map((log, lIndex) => (
              <div
                key={lIndex}
                className="w-full flex flex-row gap-[10px] py-[15px] px-[5px]"
              >
                <div className="text-[--base] text-[0.725rem] font-medium">
                  userId {log.created_by} changed {log.changed_field} from{" "}
                  {`${log.old_value} to ${log.new_value}`}
                </div>
                <div className="text-[--base] text-[0.725rem] font-light">
                  {moment(log.created_at).fromNow()}
                </div>
              </div>
            ))}
          <div className="w-full flex flex-row gap-[10px] py-[15px] px-[5px]">
            <div className="text-[--base] text-[0.725rem] font-medium">
              userId {details?.task.created_by} created the task
            </div>
            <div className="text-[--base] text-[0.725rem] font-light">
              {moment(details?.task.created_at).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
