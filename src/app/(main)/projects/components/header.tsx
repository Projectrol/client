"use client";

import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import useCustomRouter from "@/hooks/useCustomRouter";
import useRouteInfo from "@/hooks/useRouteInfo";
import TableChartIcon from "@mui/icons-material/TableChart";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddIcon from "@mui/icons-material/Add";

const ProjectsHeader = ({
  setDisplayMode,
  displayMode,
  onClickAddIcon,
}: {
  setDisplayMode: (mode: "table" | "timeline") => void;
  displayMode: "table" | "timeline";
  onClickAddIcon: () => void;
}) => {
  const { title } = useRouteInfo();
  const { shallowPush } = useCustomRouter();

  return (
    <MainBodyHeader title={title}>
      <div className="flex-1 flex flex-row items-center ml-[10px]">
        <div className="w-[70%] flex flex-row">
          <div
            className="flex ml-[5px]
          border-solid border-[1px] border-[--border-color] overflow-hidden
          flex-row rounded-sm bg-[--primary] items-center justify-center h-[30px] "
          >
            <div
              onClick={() => {
                shallowPush("/projects?view_mode=table");
                setDisplayMode("table");
              }}
              style={{
                background:
                  displayMode === "table" ? "var(--selected-bg)" : "none",
              }}
              className="h-[35px] text-[0.8rem] gap-[3px] text-[--base]
              font-medium flex items-center justify-center cursor-pointer px-[5px]"
            >
              <TableChartIcon
                color="inherit"
                fontSize="inherit"
                style={{
                  fontSize: "1.2rem",
                }}
              />
            </div>
            <div
              onClick={() => {
                shallowPush("/projects?view_mode=timeline");
                setDisplayMode("timeline");
              }}
              style={{
                background:
                  displayMode === "timeline" ? "var(--selected-bg)" : "none",
              }}
              className="h-[35px] text-[0.8rem] gap-[3px] text-[--base]
              font-medium flex items-center justify-center cursor-pointer px-[5px]"
            >
              <EventNoteIcon
                color="inherit"
                fontSize="inherit"
                style={{
                  fontSize: "1.2rem",
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-[30%] flex items-center justify-end">
          <button
            onClick={onClickAddIcon}
            className="text-[1.2rem] w-[26px] h-[26px] flex items-center justify-center hover:bg-[--hover-bg] rounded-sm"
          >
            <AddIcon className="text-[--base]" fontSize="inherit" />
          </button>
        </div>
      </div>
    </MainBodyHeader>
  );
};

export default ProjectsHeader;
