import InboxIcon from "@mui/icons-material/Inbox";
import CodeIcon from "@mui/icons-material/Code";
import LayersIcon from "@mui/icons-material/Layers";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ResourceTag } from "@/services/api/workspaces-service";

export type SidebarItem = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  to: string;
  resource_tag?: ResourceTag;
};

export type SidebarGroup = {
  title: string;
  showToggle: boolean;
  items: SidebarItem[];
};

export const mainSidebarGroups: SidebarGroup[] = [
  {
    title: "",
    showToggle: true,
    items: [
      {
        title: "Inbox",
        icon: <InboxIcon fontSize="inherit" color="inherit" />,
        to: "/inbox",
      },
      {
        title: "My issues",
        icon: <CodeIcon fontSize="inherit" color="inherit" />,
        to: "/my-issues",
      },
    ],
  },
  {
    title: "Workspace",
    showToggle: true,
    items: [
      {
        title: "Roadmaps",
        icon: <MapOutlinedIcon fontSize="inherit" color="inherit" />,
        to: "/roadmaps",
      },
      {
        title: "Projects",
        resource_tag: "projects",
        icon: <LayersIcon fontSize="inherit" color="inherit" />,
        to: "/projects?view_mode=table",
      },
      {
        title: "Teams",
        icon: <WorkspacesIcon fontSize="inherit" color="inherit" />,
        to: "/teams",
      },
      {
        title: "Calendar",
        icon: <CalendarMonthIcon fontSize="inherit" color="inherit" />,
        to: "/calendar",
      },
    ],
  },
];

export const userSettingsSidebarGroups: SidebarGroup[] = [
  {
    title: "My account",
    showToggle: false,
    items: [
      {
        title: "Profile",
        description: "Manage your profile",
        to: "/settings/profile",
        icon: null,
      },
      {
        title: "Preferences",
        description: "Manage your preferences",
        to: "/settings/preferences",
        icon: null,
      },
      {
        title: "Notifications",
        description: "Manage your notifications settings",
        to: "/settings/notifications",
        icon: null,
      },
    ],
  },
];

export const workspaceSettingsGroups: SidebarGroup[] = [
  {
    title: "",
    showToggle: false,
    items: [
      {
        title: "Roles & Permissions",
        description: "Manage workspace's roles & permissions",
        to: "/settings/permissions",
        icon: null,
      },
    ],
  },
];
