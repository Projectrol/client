"use client";

import AddIcon from "@mui/icons-material/Add";
import { useDroppable } from "@dnd-kit/core";
import { StatusColors } from "@/configs/status-colors";
import BoardCard from "./board-card";
import { CardStatus } from "@/services/api/tasks-services";

export default function StatusBoard({
  status,
  cards,
  onClickCreate,
}: {
  status: CardStatus;
  cards: any[];
  onClickCreate: () => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
    data: {
      status,
    },
  });

  return (
    <div
      style={{
        background: isOver ? "var(--selected-bg)" : "var(--hover-bg)",
        transition: "background 0.2s ease",
      }}
      className="h-full flex-1 flex flex-col rounded-sm px-[15px] py-[20px]"
    >
      <div className="flex items-center justify-center gap-[6px] w-full pb-[20px] text-[--base] font-semibold text-[0.85rem] opacity-95">
        <div
          style={{
            background: StatusColors[status],
          }}
          className="w-[18px] aspect-square rounded-full text-[--base]"
        />
        {status.charAt(0) +
          status.replaceAll("_", " ").toLowerCase().substring(1)}
        <div className="flex-1 h-full flex items-center justify-end">
          <button onClick={onClickCreate} className="text-[1rem] text-[--base]">
            <AddIcon fontSize="inherit" color="inherit" className="mb-[5px]" />
          </button>
        </div>
      </div>
      <div
        id={status}
        ref={setNodeRef}
        className="w-full flex-1 flex flex-col gap-[10px]"
      >
        {cards.map((card) => (
          <BoardCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
