"use client";

import { mainSidebarGroups, SidebarGroup } from "@/configs/sidebar-items";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sidebar from "../components/sidebar";
import Popover from "@/components/popover";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { State } from "@/services/redux/store";
import Image from "next/image";
import SearchBar from "@/components/search-bar";
import useTheme from "@/hooks/useTheme";
import { UsersService } from "@/services/api/users-service";
import { Permission } from "@/services/api/workspaces-service";
import { useUserStore } from "@/services/zustand/user-store";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { getTheme } = useTheme();
  const [isClient, setClient] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isOpenPopover, setOpenPopover] = useState(false);
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const [isOpenSideMenu, setOpenSideMenu] = useState(true);
  const { permissions } = useUserStore();

  useEffect(() => {
    setClient(true);
  }, []);

  const handleLogout = async () => {
    const success = await UsersService.Logout();
    if (success) {
      router.push("/login");
    }
  };

  const getValidItems = (
    groups: SidebarGroup[],
    userPermissions: Permission[]
  ): SidebarGroup[] => {
    return groups.map((group) => {
      return {
        ...group,
        items: group.items
          .filter((item) => !item.hidden)
          .filter(
            (item) =>
              userPermissions.findIndex(
                (uP) => uP.resource_tag === item.resource_tag && uP.can_read
              ) !== -1 || !item.resource_tag
          ),
      };
    });
  };

  if (!isClient) return null;

  const headerLightStyle = {
    background: "#077368" /* fallback for old browsers */,
    backgroundImage:
      "-webkit-linear-gradient(to right, #077368, #1b2b29)" /* Chrome 10-25, Safari 5.1-6 */,
    backgroundColor:
      "linear-gradient(to right, #077368, #1b2b29)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  };

  return (
    <div className="w-full flex flex-col h-full absolute overflow-y-hidden">
      <div
        style={
          getTheme() === "LIGHT"
            ? headerLightStyle
            : { background: "var(--primary)" }
        }
        className="w-full bg-[--secondary] border-solid border-b-[1px] border-[--border-color] 
                    px-[15px] flex flex-row items-center"
      >
        <div className="w-[30%]">
          <button onClick={() => setOpenSideMenu(!isOpenSideMenu)}>
            <MenuIcon
              htmlColor={
                getTheme() === "LIGHT" ? "var(--primary)" : "var(--base)"
              }
            />
          </button>
        </div>
        <div className="w-[40%] flex justify-center">
          <SearchBar />
        </div>
        <div className="w-[30%]" />
      </div>

      <div className="w-full flex-1 flex flex-row bg-[--primary]">
        {permissions.length > 0 && (
          <Sidebar
            isOpen={isOpenSideMenu}
            groups={getValidItems(mainSidebarGroups, permissions).map(
              (group) => {
                return {
                  ...group,
                  items: group.items.map((item) => {
                    return {
                      ...item,
                      to: `/${workspaceSlice.workspace?.general_information.slug}${item.to}`,
                    };
                  }),
                };
              }
            )}
          >
            <div
              onClick={() => setOpenPopover(true)}
              ref={ref}
              style={{
                width: "calc(100% - 15px)",
              }}
              className="flex items-center justify-start gap-[4px] text-[--base] py-[8px] px-[10px] text-[0.85rem] 
                     rounded-md hover:bg-[--hover-bg]"
            >
              <div className="flex items-center justify-start gap-[10px] pointer-events-none select-none">
                {workspaceSlice.workspace?.settings.logo !== "default" ? (
                  <Image
                    src={workspaceSlice.workspace?.settings.logo ?? ""}
                    alt="logo"
                    width={22}
                    height={22}
                    className="rounded-md mb-[3.5px]"
                  />
                ) : (
                  <div
                    className="uppercase w-[32px] h-[32px] bg-[--btn-ok-bg] flex items-center text-[0.75rem]
                      justify-center text-[#ffffff] rounded-full"
                  >
                    {workspaceSlice.workspace.general_information.name
                      .split(" ")
                      .map((word) => word.charAt(0))}
                  </div>
                )}
                {workspaceSlice?.workspace?.general_information.name}
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
                    router.push(
                      `/${workspaceSlice.workspace?.general_information.slug}/settings/preferences`
                    );
                  }}
                  className="w-[95%] text-[--base] font-medium text-[0.8rem]
                          px-[10px] py-[5px] hover:bg-[--hover-bg] rounded-sm select-none"
                >
                  Preferences
                </div>
                <div className="w-full h-[1px] bg-[--border-color]"></div>
                <div
                  onClick={handleLogout}
                  className="w-[95%] text-[--base] font-medium text-[0.8rem]
                          px-[10px] py-[5px] hover:bg-[--hover-bg] rounded-sm select-none"
                >
                  Log out
                </div>
              </div>
            </Popover>
          </Sidebar>
        )}
        <div
          style={{
            height: "100%",
            flex: 1,
            marginLeft: isOpenSideMenu ? 0 : "-250px",
            transition: "all 0.25s ease-in",
          }}
          className="bg-[--primary] box-border overflow-y-auto border-solid border-l-[1px] border-l-[--selected-bg]"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
