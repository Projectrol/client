"use client";

import ProjectEditor from "@/components/project-editor";
import { CardStatus } from "@/db/repositories/projects.repo";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import StatusBoard from "./status-board";
import { useEffect } from "react";
import useCardsByProjectSlug from "@/services/rquery/hooks/useCardsByProject";
import { Card } from "@/db/repositories/cards.repo";
import { db } from "@/db";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services/rquery/consts";
import { useRouter } from "next/navigation";

export default function ProjectBoardView({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { cards, isLoadingCardsByProjectSlug, getCardsByProjectSlugError } =
    useCardsByProjectSlug(slug);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {}, []);

  const handleDragEnd = async (event: any) => {
    const droppedCard = event.active.data.current.card as Card;
    const newStatus = event.over.data.current.status;
    const response = await db.cards.updateCardStatus(
      droppedCard.nanoid,
      newStatus
    );
    if (response) {
      router.replace(`/project/${slug}/board?time=${new Date().getTime()}`);
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
              cards={cards.filter((c) => c.status === status)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
