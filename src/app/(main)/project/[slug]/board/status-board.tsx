"use client";

import { CardStatus } from "@/db/repositories/projects.repo";
import { useDroppable } from "@dnd-kit/core";
import BoardItem from "./board-card";
import { StatusColors } from "@/configs/status-colors";
import { Card } from "@/db/repositories/cards.repo";

export default function StatusBoard({
  status,
  cards,
}: {
  status: CardStatus;
  cards: Card[];
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
    data: {
      status,
    },
  });

  return (
    <div className="h-full flex-1 bg-[--hover-bg] flex flex-col rounded-sm px-[15px] py-[20px]">
      <div className="flex items-start gap-[6px] w-full pb-[20px] text-[--base] font-semibold text-[0.85rem] opacity-95">
        <div
          style={{
            background: StatusColors[status],
          }}
          className="w-[20px] aspect-square rounded-full"
        />
        {status.replaceAll("_", " ")}
      </div>
      <div
        id={status}
        ref={setNodeRef}
        className="w-full flex-1 flex flex-col gap-[10px]"
      >
        {cards.map((card) => (
          <BoardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
