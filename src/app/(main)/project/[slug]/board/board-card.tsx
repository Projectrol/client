"use client";

import PriorityIndicator from "@/components/priority-indicator/priority-indicator";
import { StatusColors } from "@/configs/status-colors";
import { Card } from "@/db/repositories/cards.repo";
import { State } from "@/services/redux/store";
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function BoardCard({ card }: { card: Card }) {
  const router = useRouter();
  const wsSlice = useSelector((state: State) => state.workspace);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.nanoid,
    data: {
      card,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
      }
    : undefined;

  return (
    <div
      onClick={() => router.push(`/card/${card.nanoid}/${card.slug}`)}
      className="w-[300px] bg-[--primary] rounded-md p-[15px] text-[--base] text-[0.9rem]"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="w-full text-[0.75rem] text-[--text-header-color] font-semibold pb-[6px]">
        {wsSlice.workspace?.name.substring(0, 3).toUpperCase()} - {card.id + 1}
      </div>
      <div className="w-full flex items-center gap-[6px]">
        <div
          style={{
            background: StatusColors[card.status],
          }}
          className="w-[15px] aspect-square rounded-full"
        />
        <div className="flex-1 text-[0.825rem] text-[--base] font-medium">
          {card.title}
        </div>
      </div>
      <div className="w-full flex pt-[10px]">
        <PriorityIndicator priority={card.priority} />
      </div>
    </div>
  );
}
