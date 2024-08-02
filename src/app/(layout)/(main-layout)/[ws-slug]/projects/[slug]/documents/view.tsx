"use client";

import ProjectEditor from "@/components/project-editor";
import { useContext } from "react";
import { ProjectDetailsContext } from "../layout";
import Table from "@/components/table";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/button";
import { BUTTON_TYPES } from "@/configs/themes";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import axios from "axios";
import { ProjectDocument } from "@/services/api/projects-service";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services/rquery/consts";

export default function ProjectDocuments() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const value = useContext(ProjectDetailsContext);
  const workspaceDetails = useSelector(
    (state: State) => state.workspace.workspace
  );

  const onCreateBlankDocument = async () => {
    if (!workspaceDetails || !params["slug"]) return;
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/workspaces/${workspaceDetails.general_information.id}/documents/${params["slug"]}`;
    const body = {
      name: "New Document",
      content: "{}",
    };
    try {
      const response = await axios.post(url, body, { withCredentials: true });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USE_PROJECT_DOCUMENTS],
      });
      router.push("documents/" + response.data.nanoid);
    } catch (err) {}
  };

  if (value.documents) {
    return (
      <div
        style={{
          height: "calc(100vh - 125px)",
        }}
        className="w-full h-full flex flex-col overflow-y-auto"
      >
        <div className="w-full px-[20px] py-[10px]">
          <Button
            style={{
              padding: "5px 15px",
              fontSize: "0.85rem",
              borderRadius: "4px",
              fontWeight: 500,
            }}
            type={BUTTON_TYPES.OK}
            onClick={onCreateBlankDocument}
          >
            + Create
          </Button>
        </div>
        <div className="w-full flex-1">
          <Table
            loading={false}
            data={value.documents}
            columns={[
              {
                field: "name",
                headerTitle: "Name",
                width: 30,
                customRender: (item: ProjectDocument) => {
                  return (
                    <p
                      onClick={() => router.push("documents/" + item.nanoid)}
                      className="font-semibold cursor-pointer hover:underline"
                    >
                      {item.name}
                    </p>
                  );
                },
              },
              {
                headerTitle: "Created",
                width: 35,
                customRender: (item: ProjectDocument) => {
                  return (
                    <div className="w-full flex gap-[3px] text-ellipsis  overflow-x-hidden whitespace-nowrap">
                      By {item.created_by} at{" "}
                      {moment(item.created_at).format("ddd DD/MM/YY HH:mm")}
                    </div>
                  );
                },
              },
              {
                headerTitle: "Updated",
                width: 35,
                customRender: (item: ProjectDocument) => {
                  return (
                    <div className="w-full flex gap-[3px] text-ellipsis overflow-x-hidden whitespace-nowrap">
                      {item.updated_at
                        ? `By ${item.updated_by} at ${moment(
                            item.updated_at
                          ).format("ddd DD/MM/YY HH:mm")}`
                        : "--"}
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    );
  }
}
