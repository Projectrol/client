"use client";

import Table from "@/components/table";
import moment from "moment";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StatusColors } from "@/configs/status-colors";
import { State } from "@/services/redux/store";
import { useSelector } from "react-redux";
import { Project } from "@/services/api/projects-service";

export default function ProjectsTable({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  const router = useRouter();
  const workspaceSlice = useSelector((state: State) => state.workspace);

  return (
    <div className="w-full flex flex-col">
      <Table
        loading={loading}
        data={projects}
        columns={[
          {
            field: "name",
            headerTitle: "Title",
            width: 60,
            customRender: (item: Project) => {
              return (
                <p
                  onClick={() =>
                    router.push(
                      `/${workspaceSlice.workspace?.general_information.slug}/project/${item.slug}/overview`
                    )
                  }
                  className="font-semibold cursor-pointer hover:underline"
                >
                  {item.name}
                </p>
              );
            },
          },
          {
            headerTitle: "Date",
            width: 15,
            customRender: (item: Project) => {
              return (
                <div className="w-full flex gap-[3px] text-ellipsis overflow-x-hidden whitespace-nowrap">
                  {moment(item.dtstart).format("MMM DD")}
                  <ArrowForwardIcon
                    style={{
                      fontSize: "0.85rem",
                      marginTop: "3px",
                      color: "var(--base)",
                    }}
                  />
                  {moment(item.dtend).format("MMM DD")}
                </div>
              );
            },
          },
          {
            headerTitle: "Status",
            width: 8,
            customRender: (item: Project) => {
              return (
                <div className="w-full flex items-center gap-[6px]">
                  <div
                    style={{
                      width: "10px",
                      aspectRatio: 1,
                      borderRadius: "50%",
                      background: StatusColors["Backlog"],
                    }}
                  />
                  Backlog
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}
