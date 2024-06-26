"use client";

import { mainSidebarGroups } from "@/configs/sidebar-items";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sidebar from "../components/sidebar";
import Popover from "@/components/popover";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import Image from "next/image";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setClient] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isOpenPopover, setOpenPopover] = useState(false);
  const workspaceSlice = useSelector((state: State) => state.workspace);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="absolute w-full h-full flex flex-row bg-[--secondary] overflow-x-hidden">
      <Sidebar groups={mainSidebarGroups}>
        <div
          onClick={() => setOpenPopover(true)}
          ref={ref}
          className="flex items-center justify-center gap-[4px] text-[--base] py-[5px] px-[5px] text-[0.85rem] 
                     rounded-sm hover:bg-[--hover-bg]"
        >
          <div className="flex items-center gap-[5px] pointer-events-none select-none">
            <Image
              src={workspaceSlice.workspace?.logo ?? ""}
              alt="logo"
              width={22}
              height={22}
              className="rounded-md mb-[3.5px]"
            />
            {workspaceSlice?.workspace?.name}
          </div>
          <KeyboardArrowDownIcon
            htmlColor="var(--text-header-color)"
            style={{
              fontSize: "1rem",
            }}
          />
        </div>
        <Popover
          onClickOutside={() => setOpenPopover(false)}
          open={isOpenPopover}
          anchorEle={ref.current}
          style={{ marginTop: "5px" }}
          position="bottom"
        >
          <div className="w-[230px] flex flex-col items-center justify-start py-[5px] gap-[5px]">
            <div
              onClick={() => {
                setOpenPopover(false);
                router.push("/settings/preferences");
              }}
              className="w-[95%] text-[--base] font-medium text-[0.8rem] opacity-85
                          px-[10px] py-[5px] hover:bg-[--hover-bg] rounded-md select-none"
            >
              Preferences
            </div>
            <div className="w-full h-[1px] bg-[--border-color]"></div>
            <div
              className="w-[95%] text-[--base] font-medium text-[0.8rem] opacity-85
                          px-[10px] py-[5px] hover:bg-[--hover-bg] rounded-md select-none"
            >
              Manage members
            </div>
            <div className="w-full h-[1px] bg-[--border-color]"></div>
            <div
              className="w-[95%] text-[--base] font-medium text-[0.8rem] opacity-85
                          px-[10px] py-[5px] hover:bg-[--hover-bg] rounded-md select-none"
            >
              Log out
            </div>
          </div>
        </Popover>
      </Sidebar>
      <div
        style={{
          height: "calc(100% - 20px)",
          width: "calc(100% - 260px)",
          marginTop: "10px",
        }}
        className="bg-[--primary] box-border rounded-md overflow-y-auto
                  border-solid border-[1px] border-[--border-color]"
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
