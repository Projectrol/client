import { Project } from "@/db/repositories/projects.repo";
import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

export const TimelineEvent = ({
  pos,
  onDrop,
}: {
  pos: { project: Project; start: number; end: number };
  onDrop: (newX: number) => void;
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
        boxShadow: "0 0 10px 0px rgba(0,0,0,0.1)",
        cursor: "grabbing",
      }
    : undefined;

  useEffect(() => {
    if (isDragging) {
      if (!transform) return;
      setUpdatedX(pos.start + transform.x);
    }
  }, [isDragging, transform, pos]);

  useEffect(() => {
    if (!isDragging && updatedX) {
      setUpdatedX(null);
      onDrop(updatedX);
    }
  }, [isDragging, updatedX, onDrop]);

  return (
    <div
      ref={setNodeRef}
      key={pos.project.id}
      style={{
        marginLeft: pos.start + "px",
        width: pos.end - pos.start + "px",
        ...style,
      }}
      {...listeners}
      {...attributes}
      className="h-[40px] bg-[--btn-ok-bg] text-[--primary] shadow-sm text-[0.8rem] cursor-grab
        flex items-center px-[10px] rounded-md border-solid border-[1px] border-[--border-color]"
    >
      <div>{pos.project.name}</div>
    </div>
  );
};
