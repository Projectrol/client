"use client";

import { useState } from "react";
import Popover from "../../popover";
import { DatePicker } from "../../date-picker";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { State } from "@/services/redux/store";
import { useSelector } from "react-redux";
import { WorkspaceMember } from "@/services/api/workspaces-service";

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
  assignedMembers: WorkspaceMember[];
  setStartDate: (date: Date) => void;
  setTargetDate: (date: Date) => void;
  handleAssignMember: (member: WorkspaceMember) => void;
  checkIfExisted: (id: number) => boolean;
  status: string;
}) => {
  const workspaceMembers = useSelector(
    (state: State) => state.workspace.workspaceMembers
  );
  const [anchorEle, setAnchorEle] = useState<HTMLDivElement | null>(null);
  const [openPopupType, setOpenPopupType] = useState<string | null>(null);

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
