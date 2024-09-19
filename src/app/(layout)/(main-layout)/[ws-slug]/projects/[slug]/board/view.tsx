"use client";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import StatusBoard from "./status-board";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  CardStatus,
  Label,
  Task,
  TasksServices,
} from "@/services/api/tasks-services";
import CreateTaskModal from "./components/create-task-modal";
import { ProjectDetailsContext } from "../layout";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import { useParams } from "next/navigation";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { prompt } from "@/app/actions/groq";
import { promptTemplate } from "@/app/actions/prompt-template";
import { createYooptaEditor } from "@yoopta/editor";
import { isArray } from "util";

export type GenerateTasksRes = Record<
  "backend" | "frontend",
  Record<string, Record<string, string[]>>
>;

export default function ProjectBoardView() {
  const params = useParams();
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const [isOpenCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [initStatus, setInitStatus] = useState<CardStatus>(CardStatus.TODO);
  const value = useContext(ProjectDetailsContext);
  const [projectDes, setProjectDes] = useState<string | null>(null);
  const [tasks, setTasks] = useState<
    { nanoid: string; status: CardStatus; title: string }[]
  >(value.tasks);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    if (value) {
      setTasks(value.tasks);
    }
  }, [value]);

  const handleDragEnd = async (event: any) => {
    const droppedCard = event.active.data.current.card as Task;
    const newStatus = event.over.data.current.status;
    const wsId = workspaceSlice.workspace?.general_information.id as number;
    const projectSlug = params["slug"] as string;

    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex(
      (t) => t.nanoid === droppedCard.nanoid,
    );
    if (index === -1) return;

    if (newStatus !== updatedTasks[index].status) {
      updatedTasks[index].status = newStatus;
      setTasks(updatedTasks);
      const response = await TasksServices.UpdateProjectTask(
        wsId,
        projectSlug,
        droppedCard.nanoid,
        {
          changed_field: "status",
          value: newStatus,
        },
      );
      if (response.status === "fail") {
        alert(false);
      }
    }
  };

  useEffect(() => {
    if (value && value.details?.project.description) {
      const des = JSON.parse(value.details.project.description);
      for (let key in des) {
        if (
          (des[key].value[0].children[0].text + "").includes(
            "Project Description",
          )
        ) {
          const projectDes = des[key].value[0].children[0].text
            .split("Project Description:")[1]
            .trim()
            .split("\n")[0];
          setProjectDes(projectDes);
        }
      }
    }
  }, [value]);

  const createTask = async ({
    description,
    title,
  }: {
    description: string;
    title: string;
  }) => {
    if (workspaceSlice.workspace?.general_information && value.details) {
      await TasksServices.CreateProjectTask(
        workspaceSlice.workspace?.general_information.id,
        value.details.project.slug,
        {
          description,
          is_published: true,
          label: Label.FEATURE,
          project_slug: value.details.project.slug,
          status: CardStatus.TODO,
          title,
        },
      );
    }
  };

  const generateTasks = async () => {
    if (projectDes) {
      const resStr = await prompt(
        projectDes.trim(),
        promptTemplate.projectTasks,
      );
      console.log(resStr);
      const resObj = JSON.parse(resStr) as GenerateTasksRes;
      const backendFeaturesDes: { name: string; description: string }[] = [];
      Object.keys(resObj.backend).map((key) => {
        // console.log(key)
        Object.keys(resObj.backend[key]).map((key2) => {
          let featureDes = `${key} service that contains following sub features: `;
          if (Array.isArray(resObj.backend[key][key2])) {
            resObj.backend[key][key2].forEach((subFeature) => {
              featureDes += subFeature + ", ";
            });
          } else {
            featureDes += resObj.backend[key][key2]; 
          }
          backendFeaturesDes.push({
            name: key,
            description: featureDes,
          });
        });
      });
      await Promise.all(
        backendFeaturesDes.map(async (featureDes) => {
          const { description, name } = featureDes;
          const res = await prompt(description, promptTemplate.taskDescription);
          const editor = createYooptaEditor();
          editor.insertBlock({
            id: "asd12345-45c9-4176-b6be-9607a84909b2",
            value: [
              {
                id: "23cf6a14-45c9-4176-b6be-9607a84909b2",
                type: "paragraph",
                children: [
                  {
                    text: res,
                  },
                ],
                props: {
                  nodeType: "block",
                },
              },
            ],
            type: "Paragraph",
            meta: {
              order: 0,
              depth: 0,
            },
          });
          await createTask({
            description: JSON.stringify(editor.getEditorValue()),
            title:
              name.charAt(0).toUpperCase() + name.substring(1) + " service",
          });
        }),
      );
      const frontendFeatures = Object.keys(resObj.frontend).map((key) => {
        Object.keys(resObj.frontend[key]).map((key2) => {
          return resObj.frontend[key][key2];
        });
      });
    }
  };

  return (
    <div className="h-full w-full bg-[--primary] px-[10px] py-[10px]">
      <div className="h-[50px] w-full px-1 pt-2 text-sm font-semibold text-[--base]">
        {`Don't know where to start? Try generating tasks with`}{" "}
        <span className="px-1 text-green-600">
          <AutoAwesomeIcon fontSize="inherit" /> AI
        </span>{" "}
        by clicking{" "}
        <span
          onClick={generateTasks}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          here
        </span>
      </div>
      <div className="flex w-full flex-1 flex-row gap-[10px] overflow-x-auto">
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {Object.entries(CardStatus).map(([_, status], __) => (
            <StatusBoard
              key={status}
              status={status}
              onClickCreate={() => {
                setInitStatus(status);
                setOpenCreateTaskModal(true);
              }}
              cards={tasks ? tasks.filter((t) => t.status === status) : []}
            />
          ))}
        </DndContext>
      </div>
      <CreateTaskModal
        isOpen={isOpenCreateTaskModal}
        onClose={() => setOpenCreateTaskModal(false)}
        initStatus={initStatus}
      />
    </div>
  );
}
