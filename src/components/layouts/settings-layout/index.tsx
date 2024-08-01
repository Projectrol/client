"use client";

import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  userSettingsSidebarGroups,
  workspaceSettingsGroups,
} from "@/configs/sidebar-items";
import Sidebar from "../components/sidebar";
import useRouteInfo from "@/hooks/useRouteInfo";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { description, title } = useRouteInfo();
  const workspaceSlice = useSelector((state: State) => state.workspace);

  const getWorkspaceSettingsGroups = () => {
    return workspaceSettingsGroups.map((group) => {
      return {
        ...group,
        title: workspaceSlice.workspace?.general_information.name ?? "",
        items: group.items
          .filter((item) => !item.hidden)
          .map((item) => {
            return {
              ...item,
              to: `/${workspaceSlice.workspace?.general_information.slug}${item.to}`,
            };
          }),
      };
    });
  };

  const getUserSetttingsGroups = () => {
    return userSettingsSidebarGroups.map((group) => {
      return {
        ...group,
        items: group.items.map((item) => {
          return {
            ...item,
            to: `/${workspaceSlice.workspace?.general_information.slug}${item.to}`,
          };
        }),
      };
    });
  };

  return (
    <div className="absolute w-full h-full flex flex-row bg-[--primary]">
      <Sidebar
        isOpen
        groups={[...getWorkspaceSettingsGroups(), ...getUserSetttingsGroups()]}
      >
        <div
          onClick={() => router.back()}
          className="flex items-center justify-center gap-[4px] text-[--base] py-[5px] px-[5px] text-[0.85rem]"
        >
          <ChevronLeftIcon />
          <div className="pointer-events-none select-none">Settings</div>
        </div>
      </Sidebar>
      <div
        style={{
          height: "100%",
          width: "calc(100% - 260px)",
        }}
        className="bg-[--primary] box-border border-solid border-l-[1px]  border-l-[--selected-bg] overflow-y-auto"
      >
        <div className="w-full min-h-full px-[60px] py-[40px] flex flex-col bg-[--secondary] shadow-md ">
          <div className="w-full text-[--base] font-semibold text-[1.5rem]">
            {title}
          </div>
          <div className="w-full text-[--text-header-color] font-medium text-[0.85rem] pt-[2.5px]">
            {description}
          </div>
          <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
