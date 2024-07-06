import InboxIcon from "@mui/icons-material/Inbox";
import CodeIcon from "@mui/icons-material/Code";
import LayersIcon from "@mui/icons-material/Layers";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export type SidebarItem = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  to: string;
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

export const settingsSidebarGroups: SidebarGroup[] = [
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
    ],
  },
];
