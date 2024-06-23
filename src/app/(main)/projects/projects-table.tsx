"use client";

import Table from "@/components/table";
import { Project } from "@/db/repositories/projects.repo";
import moment from "moment";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
                  onClick={() => router.push(`/project/${item.slug}`)}
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
              return <div>{item.status}</div>;
            },
          },
        ]}
      />
    </div>
  );
}
