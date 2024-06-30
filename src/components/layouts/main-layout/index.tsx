"use client";

import { mainSidebarGroups } from "@/configs/sidebar-items";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sidebar from "../components/sidebar";
import Popover from "@/components/popover";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { State } from "@/services/redux/store";
import Image from "next/image";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setClient] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isOpenPopover, setOpenPopover] = useState(false);
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const [isOpenSideMenu, setOpenSideMenu] = useState(true);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col h-full absolute overflow-y-hidden">
      <div className="w-full bg-[--secondary] border-solid border-b-[1px] border-[--border-color] px-[15px] py-[10px]">
        <button onClick={() => setOpenSideMenu(!isOpenSideMenu)}>
          <MenuIcon />
        </button>
      </div>

      <div className="w-full flex-1 flex flex-row bg-[--secondary]">
        <Sidebar isOpen={isOpenSideMenu} groups={mainSidebarGroups}>
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
            height: "100%",
            flex: 1,
            marginLeft: isOpenSideMenu ? 0 : "-250px",
            transition: "all 0.25s ease-in",
          }}
          className="bg-[--primary] box-border overflow-y-auto border-solid border-l-[1px] border-l-[--border-color]"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
