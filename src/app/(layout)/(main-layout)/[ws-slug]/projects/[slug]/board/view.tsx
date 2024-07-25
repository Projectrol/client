"use client";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import StatusBoard from "./status-board";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CardStatus } from "@/services/api/tasks-services";
import CreateTaskModal from "./components/create-task-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";

export default function ProjectBoardView({ slug }: { slug: string }) {
  const router = useRouter();
  const workspaceSlice = useSelector(
    (state: State) => state.workspace.workspace
  );
  const [isOpenCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [initStatus, setInitStatus] = useState<CardStatus>(CardStatus.TODO);
  const [tasks, setTasks] = useState<
    { nanoid: string; status: CardStatus; title: string }[]
  >([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const getTasks = async () => {
      const url = `http://localhost:8080/api/workspaces/${workspaceSlice?.general_information.id}/tasks/${slug}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      setTasks(response.data.tasks);
    };
    getTasks();
  }, [workspaceSlice, slug]);

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
