"use client";

import { useContext, useEffect, useState } from "react";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { State } from "@/services/redux/store";
import { useSelector } from "react-redux";
import { WorkspaceMember } from "@/services/api/workspaces-service";
import Popover from "@/components/popover";
import { CardStatus, Label, Priority } from "@/services/api/tasks-services";
import clsx from "clsx";
import { ProjectDetailsContext } from "../../layout";

const TaskAttributesBar = ({
  status,
  setStatus,
  label,
  setLabel,
  priority,
  setPriority,
}: {
  status: CardStatus;
  setStatus: (status: CardStatus) => void;
  label: Label;
  setLabel: (label: Label) => void;
  priority: number;
  setPriority: (priority: number) => void;
}) => {
  const value = useContext(ProjectDetailsContext);
  const [projectMembers, setProjectMembers] = useState<WorkspaceMember[]>([]);
  const workspaceMembers = useSelector(
    (state: State) => state.workspace.workspaceMembers
  );
  const [anchorEle, setAnchorEle] = useState<HTMLDivElement | null>(null);
  const [openPopupType, setOpenPopupType] = useState<string | null>(null);

  useEffect(() => {
    if (value && value.details && workspaceMembers) {
      const memberIds = value.details.memberIds;
      const projectMembers: WorkspaceMember[] = workspaceMembers.filter((wm) =>
        memberIds.includes(wm.id)
      );
      setProjectMembers(projectMembers);
    }
  }, [value, workspaceMembers]);

  return (
    <div className="w-full flex flex-row gap-[8px]">
      <div
        onClick={(e) => {
          if (openPopupType === null) {
            setOpenPopupType("STATUS");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color] text-[--base]
                  text-[0.8rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg] align-middle"
      >
        {status.charAt(0) +
          status.replaceAll("_", " ").substring(1).toLowerCase()}
      </div>

      <div
        onClick={(e) => {
          if (openPopupType === null) {
            setOpenPopupType("LABEL");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color] text-[--base]
                  text-[0.8rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg] align-middle"
      >
        {label.charAt(0) +
          label.replaceAll("_", " ").substring(1).toLowerCase()}
      </div>

      <div
        onClick={(e) => {
          if (openPopupType === null) {
            setOpenPopupType("PRIORITY");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color] text-[--base]
                  text-[0.8rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg] align-middle"
      >
        {Priority[priority].charAt(0) +
          Priority[priority].replaceAll("_", " ").substring(1).toLowerCase()}
      </div>

      <div
        onClick={(e) => {
          if (openPopupType === null) {
            setOpenPopupType("ASSIGN");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color] text-[--base]
                  text-[0.8rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg] align-middle"
      >
        Assign this task to ...
      </div>

      <Popover
        onClickOutside={() => {
          setOpenPopupType(null);
          setAnchorEle(null);
        }}
        anchorEle={anchorEle}
        open={openPopupType != null}
        position="bottom"
        style={{
          marginTop: "3px",
        }}
      >
        {openPopupType === "STATUS" && (
          <div className="w-[180px] flex flex-col">
            {Object.entries(CardStatus).map(([key, value]) => (
              <div
                onClick={() => {
                  setStatus(value);
                  setOpenPopupType(null);
                }}
                key={key}
                className={clsx(
                  {
                    "w-full px-[10px] text-[--base] text-[0.75rem] font-medium py-[8px] flex items-center cursor-pointer":
                      true,
                  },
                  {
                    "bg-[--selected-bg]": key === status,
                  },
                  {
                    "hover:bg-[--hover-bg]": key !== status,
                  }
                )}
              >
                {value.charAt(0) +
                  value.replaceAll("_", " ").substring(1).toLowerCase()}
              </div>
            ))}
          </div>
        )}

        {openPopupType === "LABEL" && (
          <div className="w-[180px] flex flex-col">
            {Object.entries(Label).map(([key, value]) => (
              <div
                onClick={() => {
                  setLabel(value);
                  setOpenPopupType(null);
                }}
                key={key}
                className={clsx(
                  {
                    "w-full px-[10px] text-[--base] text-[0.75rem] font-medium py-[8px] flex items-center cursor-pointer":
                      true,
                  },
                  {
                    "bg-[--selected-bg]": key === label,
                  },
                  {
                    "hover:bg-[--hover-bg]": key !== label,
                  }
                )}
              >
                {value.charAt(0) +
                  value.replaceAll("_", " ").substring(1).toLowerCase()}
              </div>
            ))}
          </div>
        )}

        {openPopupType === "PRIORITY" && (
          <div className="w-[180px] flex flex-col">
            {Object.keys(Priority).map((key) => (
              <div
                onClick={() => {
                  setPriority(parseInt(key));
                  setOpenPopupType(null);
                }}
                key={key}
                className={clsx(
                  {
                    "w-full px-[10px] text-[--base] text-[0.75rem] font-medium py-[8px] flex items-center cursor-pointer":
                      true,
                  },
                  {
                    "bg-[--selected-bg]": parseInt(key) === priority,
                  },
                  {
                    "hover:bg-[--hover-bg]": parseInt(key) !== priority,
                  }
                )}
              >
                {Priority[parseInt(key)].charAt(0) +
                  Priority[parseInt(key)]
                    .replaceAll("_", " ")
                    .substring(1)
                    .toLowerCase()}
              </div>
            ))}
          </div>
        )}

        {openPopupType === "ASSIGN" && (
          <div className="w-[180px] flex flex-col">
            {projectMembers.map((member) => (
              <div
                onClick={() => {}}
                key={member.id}
                className={clsx(
                  {
                    "w-full px-[10px] text-[--base] text-[0.75rem] font-medium py-[8px] flex items-center cursor-pointer":
                      true,
                  }
                  // {
                  //   "bg-[--selected-bg]": parseInt(key) === priority,
                  // },
                  // {
                  //   "hover:bg-[--hover-bg]": parseInt(key) !== priority,
                  // }
                )}
              >
                {member.email}
              </div>
            ))}
          </div>
        )}
      </Popover>
    </div>
  );
};

export default TaskAttributesBar;
