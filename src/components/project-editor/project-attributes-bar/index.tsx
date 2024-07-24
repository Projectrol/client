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
            setOpenPopupType("START_DATE");
            setAnchorEle(e.currentTarget);
          } else {
            setOpenPopupType(null);
            setAnchorEle(null);
          }
        }}
        className="rounded-md border-solid border-[2px] border-[--border-color] text-[--base]
                  text-[0.85rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg]"
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
        className="rounded-md border-solid border-[2px] border-[--border-color] text-[--base]
                  text-[0.85rem] px-[8px] py-[3px] select-none hover:bg-[--hover-bg]"
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
      </Popover>
    </div>
  );
};

export default ProjectAttributesBar;
