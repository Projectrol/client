import {
  SidebarGroup,
  mainSidebarGroups,
  settingsSidebarGroups,
} from "@/configs/sidebar-items";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useRouteInfo = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (pathname) {
      const pathWithoutSlug = "/" + pathname.split("/").slice(2).join("/");
      let found = false;
      for (let i = 0; i < settingsSidebarGroups.length; i++) {
        for (let z = 0; z < settingsSidebarGroups[i].items.length; z++) {
          if (
            pathWithoutSlug ===
            settingsSidebarGroups[i].items[z].to.split("?")[0]
          ) {
            setTitle(settingsSidebarGroups[i].items[z].title);
            setDescription(settingsSidebarGroups[i].items[z].description ?? "");
            found = true;
            break;
          }
        }
      }
      if (!found) {
        for (let i = 0; i < mainSidebarGroups.length; i++) {
          for (let z = 0; z < mainSidebarGroups[i].items.length; z++) {
            if (
              pathWithoutSlug === mainSidebarGroups[i].items[z].to.split("?")[0]
            ) {
              setTitle(mainSidebarGroups[i].items[z].title);
              setDescription(mainSidebarGroups[i].items[z].description ?? "");
              break;
            }
          }
        }
      }
    }
  }, [pathname]);

  return {
    title,
    description,
  };
};

export default useRouteInfo;
