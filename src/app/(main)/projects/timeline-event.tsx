import { Project } from "@/db/repositories/projects.repo";
import { useDraggable } from "@dnd-kit/core";
import moment from "moment";
import { useEffect, useState } from "react";

export const TimelineEvent = ({
  pos,
  onDrop,
  onDragging,
  draggingOnDate,
}: {
  pos: { project: Project; start: number; end: number };
  onDrop: (newX: number) => void;
  onDragging: (currentX: number | null) => void;
  draggingOnDate: {
    eventIndex: number;
    start: Date;
    target: Date;
  } | null;
}) => {
  const [updatedX, setUpdatedX] = useState<number | null>(null);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: pos.project.slug,
    });
  const style = transform
    ? {
        transform: `translateX(${transform.x}px`,
        border: "2px solid var(--btn-ok-bg)",
        boxShadow: "0 0 10px 0px rgba(0,0,0,0.25)",
        cursor: "grabbing",
      }
    : undefined;

  useEffect(() => {
    if (isDragging) {
      if (!transform) return;
      setUpdatedX(pos.start + transform.x);
      onDragging(pos.start + transform.x);
    }
  }, [isDragging, transform, pos, onDragging]);

  useEffect(() => {
    if (!isDragging && updatedX) {
      setUpdatedX(null);
      onDrop(updatedX);
      onDragging(null);
    }
  }, [isDragging, updatedX, onDrop, onDragging]);

  return (
    <div
      id={`event-${pos.project.id}`}
      ref={setNodeRef}
      key={pos.project.id}
      style={{
        marginLeft: pos.start + "px",
        width: pos.end - pos.start + "px",
        ...style,
      }}
      {...listeners}
      {...attributes}
      className="h-[40px] bg-[--primary] text-[--base] shadow-sm text-[0.8rem] cursor-grab relative
        flex items-center px-[10px] rounded-md border-solid border-[1px] border-[--border-color] z-[600]"
    >
      {updatedX && draggingOnDate && (
        <div
          className="absolute bg-[--btn-ok-bg] text-[white] text-[0.75rem]
        -translate-y-[45px] z-[600] px-[15px] py-[5px] rounded-sm"
        >
          {moment(draggingOnDate.start).format("ddd, MMM DD")} -{" "}
          {moment(draggingOnDate.target).format("ddd, MMM DD")}
        </div>
      )}
      <div>{pos.project.name}</div>
    </div>
  );
};
