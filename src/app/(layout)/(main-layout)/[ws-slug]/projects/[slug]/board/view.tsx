"use client";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import StatusBoard from "./status-board";
import { useEffect, useState } from "react";
import useCardsByProjectSlug from "@/services/rquery/hooks/useCardsByProject";
import { useRouter } from "next/navigation";
import { CardStatus } from "@/services/api/tasks-services";
import CreateTaskModal from "./components/create-task-modal";

export default function ProjectBoardView({ slug }: { slug: string }) {
  const router = useRouter();
  const [isOpenCreateTaskModal, setOpenCreateTaskModal] = useState(true);
  const [initStatus, setInitStatus] = useState<CardStatus>(CardStatus.TODO);
  const { cards } = useCardsByProjectSlug(slug);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {}, []);

  const handleDragEnd = async (event: any) => {
    // const droppedCard = event.active.data.current.card;
    // const newStatus = event.over.data.current.status;
    // droppedCard.status = newStatus;
    // const response = await db.cards.updateCardStatus(
    //   droppedCard.nanoid,
    //   newStatus
    // );
    // if (response) {
    //   router.replace(`/project/${slug}/board?time=${new Date().getTime()}`);
    // }
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
              cards={cards.filter((c) => c.status === status)}
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
