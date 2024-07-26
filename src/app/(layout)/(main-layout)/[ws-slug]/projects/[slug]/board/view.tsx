"use client";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import StatusBoard from "./status-board";
import { useContext, useState } from "react";
import { CardStatus } from "@/services/api/tasks-services";
import CreateTaskModal from "./components/create-task-modal";
import { ProjectDetailsContext } from "../layout";

export default function ProjectBoardView() {
  const [isOpenCreateTaskModal, setOpenCreateTaskModal] = useState(true);
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

  const handleDragEnd = async (event: any) => {
    const droppedCard = event.active.data.current.card;
    const newStatus = event.over.data.current.status;
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex(
      (t) => t.nanoid === droppedCard.nanoid
    );
    if (index === -1) return;
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
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
