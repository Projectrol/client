"use client";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import StatusBoard from "./status-board";
import { useContext, useEffect, useState } from "react";
import { CardStatus, Task, TasksServices } from "@/services/api/tasks-services";
import CreateTaskModal from "./components/create-task-modal";
import { ProjectDetailsContext } from "../layout";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import { useParams } from "next/navigation";

export default function ProjectBoardView() {
  const params = useParams();
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const [isOpenCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [initStatus, setInitStatus] = useState<CardStatus>(CardStatus.TODO);
  const value = useContext(ProjectDetailsContext);
  const [tasks, setTasks] = useState<
    { nanoid: string; status: CardStatus; title: string }[]
  >(value.tasks);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
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
      (t) => t.nanoid === droppedCard.nanoid
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
        }
      );
      if (response.status === "fail") {
        alert(false);
      }
    }
  };

  return (
    <div className="w-full h-full bg-[--primary] px-[10px] py-[10px]">
      <div className="w-full h-full flex flex-row gap-[10px] overflow-x-auto">
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
