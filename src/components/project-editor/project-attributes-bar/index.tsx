"use client";

import { useRef, useState } from "react";
import Popover from "../../popover";
import { DatePicker } from "../../date-picker";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { WorkspacesController } from "@/db/controllers/workspaces.controller";
import Image from "next/image";
import { ProjectRole, User } from "@/db/repositories/users.repo";
import { CardStatus } from "@/db/repositories/projects.repo";

const ProjectAttributesBar = ({
  startDate,
  targetDate,
  assignedMembers,
  status,
  setStartDate,
  setTargetDate,
  handleAssignMember,
  checkIfExisted,
}: {
  startDate: Date | null;
  targetDate: Date | null;
  assignedMembers: Array<{ role: ProjectRole } & User>;
  setStartDate: (date: Date) => void;
  setTargetDate: (date: Date) => void;
  handleAssignMember: (user: User) => void;
  checkIfExisted: (id: number) => boolean;
  status: CardStatus;
}) => {
  const workspaceMembers = WorkspacesController.getWorkspaceMembers(0);
  const [anchorEle, setAnchorEle] = useState<HTMLDivElement | null>(null);
  const [openPopupType, setOpenPopupType] = useState<string | null>(null);
  const targetDateDivRef = useRef<HTMLDivElement>(null);

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
        className="rounded-md border-solid border-[2px] border-[--border-color]
                  text-[0.75rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg]"
      >
        {status}
      </div>

      <div
        onClick={(e) => {
          if (openPopupType === null) {
            setOpenPopupType("START_DATE");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color]
                  text-[0.75rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg]"
      >
        {!startDate ? "Start date" : moment(startDate).format("MMM DD, YYYY")}
      </div>

      <ArrowForwardIcon
        style={{
          fontSize: "1rem",
          marginTop: "5px",
          color: "var(--base)",
        }}
      />

      <div
        ref={targetDateDivRef}
        onClick={(e) => {
          if (openPopupType === null) {
            setOpenPopupType("TARGET_DATE");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color]
                  text-[0.75rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg]"
      >
        {!targetDate
          ? "Target date"
          : moment(targetDate).format("MMM DD, YYYY")}
      </div>

      <div
        ref={targetDateDivRef}
        onClick={(e) => {
          if (openPopupType === null) {
            setOpenPopupType("MEMBERS");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color]
                  text-[0.75rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg]"
      >
        {assignedMembers.length > 0
          ? `${assignedMembers.length}` +
            `${assignedMembers.length === 1 ? " member" : " members"}`
          : "Members"}
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
        {openPopupType === "START_DATE" && (
          <DatePicker
            value={startDate}
            onSelect={(val) => {
              setStartDate(val);
              setOpenPopupType(null);
            }}
          />
        )}
        {openPopupType === "TARGET_DATE" && (
          <DatePicker
            value={targetDate}
            onSelect={(val) => {
              setTargetDate(val);
              setOpenPopupType(null);
            }}
          />
        )}
        {openPopupType === "MEMBERS" && (
          <div
            className="w-[280px] bg-[--primary] flex flex-col px-[6px] py-[5px] gap-[0px] 
          border-solid border-[1px] border-[--border-color] rounded-md"
          >
            {workspaceMembers.length > 0 &&
              workspaceMembers.map((user) => (
                <div
                  key={user.id}
                  className="w-full flex items-center gap-[10px] hover:bg-[--hover-bg] py-[5px] px-[10px] rounded-md"
                >
                  <input
                    checked={checkIfExisted(user.id) ? true : false}
                    onClick={() => handleAssignMember(user)}
                    type="checkbox"
                  />
                  <div className="flex flex-row items-center gap-[10px]  text-[0.85rem] text-[--base] opacity-85 select-none">
                    <Image
                      src={user.avatar ?? ""}
                      width={18}
                      height={18}
                      className="rounded-full"
                      alt="user-avatar"
                    />
                    {user.username}
                  </div>
                </div>
              ))}
          </div>
        )}
        {openPopupType === "STATUS" && (
          <div
            className="w-[280px] bg-[--primary] flex flex-col px-[6px] py-[5px] gap-[0px] 
                      border-solid border-[1px] border-[--border-color] rounded-md"
          >
            123
          </div>
        )}
      </Popover>
    </div>
  );
};

export default ProjectAttributesBar;
