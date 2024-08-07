"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import useCustomRouter from "@/hooks/useCustomRouter";
import useRouteInfo from "@/hooks/useRouteInfo";
import AddIcon from "@mui/icons-material/Add";
import Tabs, { Tab } from "@/components/tabs";
import Popover from "@/components/popover";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import ComponentRenderByPermission from "@/components/authorization/component-render-by-permission";

const ProjectsHeader = ({
  setDisplayMode,
  displayMode,
  onClickAddIcon,
}: {
  setDisplayMode: (mode: "table" | "timeline") => void;
  displayMode: "table" | "timeline";
  onClickAddIcon: () => void;
}) => {
  const anchorEle = useRef<HTMLDivElement>(null);
  const { title } = useRouteInfo();
  const { shallowPush } = useCustomRouter();
  const [isOpenPopover, setOpenPopover] = useState(false);
  const workspaceSlice = useSelector((state: State) => state.workspace);

  const renderTopLeftHeader = () => {
    return (
      <div
        className="cursor-pointer w-[30px] h-[28px] flex items-center justify-center ml-[5px] rounded-sm"
        ref={anchorEle}
        onClick={() => {
          setOpenPopover(!isOpenPopover);
        }}
      >
        <KeyboardArrowDownIcon />
      </div>
    );
  };

  const renderBottomLeftHeader = () => {
    const tabItems: Tab[] = [
      {
        key: "table",
        element: (
          <span
            onClick={() => {
              shallowPush(
                `/${workspaceSlice.workspace?.general_information.slug}/projects?view_mode=table`
              );
              setDisplayMode("table");
            }}
            className="text-[--base] text-[0.85rem] cursor-pointer"
          >
            Table
          </span>
        ),
      },
      {
        key: "timeline",
        element: (
          <span
            onClick={() => {
              shallowPush(
                `/${workspaceSlice.workspace?.general_information.slug}/projects?view_mode=timeline`
              );
              setDisplayMode("timeline");
            }}
            className="text-[--base] text-[0.85rem] cursor-pointer"
          >
            Timeline
          </span>
        ),
      },
    ];
    return (
      <Tabs
        style={{ marginTop: "5px" }}
        selectedKey={displayMode}
        gap={15}
        items={tabItems}
      />
    );
  };

  return (
    <>
      <MainBodyHeader
        title={title}
        leftStyle={{
          width: "90%",
          paddingTop: "15px",
        }}
        topLeftElement={renderTopLeftHeader()}
        bottomLeftElement={renderBottomLeftHeader()}
      />
      <Popover
        open={isOpenPopover}
        onClickOutside={() => setOpenPopover(false)}
        position="bottom"
        style={{
          marginTop: "2px",
        }}
        anchorEle={anchorEle.current}
      >
        <ComponentRenderByPermission
          requiredPermission={{
            permissionType: "can_create",
            resourceTag: "projects",
          }}
        >
          <div className="flex flex-col">
            <div
              onClick={onClickAddIcon}
              className="w-full text-[--base] text-[0.8rem] pl-[5px] pr-[10px] py-[6px] flex items-center gap-[2.5px] font-medium cursor-pointer hover:bg-[--hover-bg]"
            >
              <AddIcon
                className="text-[--base]"
                fontSize="inherit"
                style={{ fontSize: "1rem" }}
              />
              Create new project
            </div>
          </div>
        </ComponentRenderByPermission>
      </Popover>
    </>
  );
};

export default ProjectsHeader;
