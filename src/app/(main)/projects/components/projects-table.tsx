"use client";

import Table from "@/components/table";
import { Project } from "@/db/repositories/projects.repo";
import moment from "moment";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StatusColors } from "@/configs/status-colors";

export default function ProjectsTable({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  const router = useRouter();

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
                  onClick={() => router.push(`/project/${item.slug}/overview`)}
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
                  {moment(item.startDate).format("MMM DD")}
                  <ArrowForwardIcon
                    style={{
                      fontSize: "0.85rem",
                      marginTop: "3px",
                      color: "var(--base)",
                    }}
                  />
                  {moment(item.targetDate).format("MMM DD")}
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
                      background: StatusColors[item.status],
                    }}
                  />
                  {item.status.replaceAll("_", " ")}
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}
