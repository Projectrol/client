import { StatusColors } from "@/configs/status-colors";
import { Project } from "@/db/repositories/projects.repo";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const TimelineEvent = ({
  pos,
  onClick,
  onClickOutside,
  onDrop,
  onDragging,
  onMouseLeave,
  onMouseOver,
  selectedProject,
  draggingOnDate,
}: {
  pos: { project: Project; start: number; end: number };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onClickOutside?: () => void;
  onDrop: (newX: number) => void;
  onDragging: (currentX: number | null) => void;
  draggingOnDate: {
    eventIndex: number;
    start: Date;
    target: Date;
  } | null;
  selectedProject: Project | null;
}) => {
  const router = useRouter();
  const [updatedX, setUpdatedX] = useState<number | null>(null);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: pos.project.slug,
    });
  const style = transform
    ? {
        transform: `translateX(${transform.x}px`,
        border: `1px solid var(--btn-ok-bg)`,
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
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onBlur={onClickOutside}
      onClick={onClick}
      onDoubleClick={() => router.push(`/project/${pos.project.slug}/overview`)}
      id={`event-${pos.project.id}`}
      ref={setNodeRef}
      key={pos.project.id}
      style={{
        marginLeft: pos.start + "px",
        width: pos.end - pos.start + "px",
        background: StatusColors[pos.project.status],
        ...style,
      }}
      {...listeners}
      {...attributes}
      className={clsx(
        {
          "h-[75%] text-[#ffffff] box-border shadow-sm text-[0.8rem] cursor-default relative select-none flex items-center px-[10px] rounded-md border-solid z-[600]":
            true,
        },
        {
          "hover:border-[--btn-ok-bg] hover:border-[1px]":
            selectedProject?.id !== pos.project.id,
          "border-[--btn-ok-bg] border-[1px]":
            selectedProject?.id === pos.project.id,
        }
      )}
    >
      {updatedX && draggingOnDate && (
        <div
          className="absolute bg-[--btn-ok-bg] text-[white] text-[0.75rem] whitespace-nowrap
        -translate-y-[45px] z-[600] px-[15px] py-[5px] rounded-md select-none opacity-90"
        >
          {moment(draggingOnDate.start).format("ddd, MMM DD")} -{" "}
          {moment(draggingOnDate.target).format("ddd, MMM DD")}
        </div>
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
        {pos.project.name}
      </div>
    </div>
  );
};
