"use client";

import { StatusColors } from "@/configs/status-colors";
import { State } from "@/services/redux/store";
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function BoardCard({ card }: { card: any }) {
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
        zIndex: 100,
      }
    : undefined;

  return (
    <div
      onClick={() => router.push(`tasks/${card.nanoid}`)}
      className="w-full bg-[--primary] rounded-md p-[15px] text-[--base] text-[0.9rem]"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="w-full text-[0.75rem] text-[--text-header-color] font-semibold pb-[6px]">
        {wsSlice.workspace?.general_information.name
          .substring(0, 3)
          .toUpperCase()}{" "}
        - {card.nanoid}
      </div>
      <div className="w-full flex items-start gap-[6px]">
        <div
          style={{
            background: StatusColors[card.status],
          }}
          className="w-[15px] aspect-square rounded-full mt-[2px]"
        />
        <div className="flex-1 text-[0.825rem] text-[--base] font-medium text-ellipsis overflow-hidden">
          {card.title}
        </div>
      </div>
    </div>
  );
}
