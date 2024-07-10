import { StatusColors } from "@/configs/status-colors";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import CircleIcon from "@mui/icons-material/Circle";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import { Project } from "@/services/api/projects-service";

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
  onResizeFinish,
  onResizing,
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
  onResizeFinish: (width: number) => void;
  onResizing: (width: number) => void;
}) => {
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const [disabled, setDisabled] = useState(false);
  const [isResizing, setResizing] = useState(false);
  const [width, setWidth] = useState(pos.end - pos.start);
  const router = useRouter();
  const [updatedX, setUpdatedX] = useState<number | null>(null);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: pos.project.slug,
      disabled,
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

  const onResize = (event: any, { node, size, handle }: any) => {
    setResizing(true);
    const oldWidth = pos.end - pos.start;
    const diff = Math.abs(oldWidth - size.width);
    let newWidth = size.width;
    // if (oldWidth > newWidth) {
    //   if (diff < 5) {
    //     newWidth -= 5;
    //   }
    // } else {
    //   newWidth += 5;
    // }
    setWidth(newWidth);
    onResizing(newWidth);
  };

  const onResizeStop = (event: any, { node, size, handle }: any) => {
    setResizing(false);
    onResizeFinish(size.width);
  };

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = "w-resize";
    }
    if (isDragging) {
      document.body.style.cursor = "grabbing";
    }
    if (!isResizing && !isDragging) {
      document.body.style.cursor = "default";
    }
  }, [isResizing, isDragging]);

  return (
    <Resizable
      minConstraints={[10, 10]}
      height={35}
      width={width}
      onResize={onResize}
      resizeHandles={["e"]}
      onResizeStop={onResizeStop}
      handle={
        <div
          onMouseOver={() => setDisabled(true)}
          onMouseLeave={() => setDisabled(false)}
          className={clsx(
            {
              "cursor-w-resize rounded-e-md round right-[0px] absolute text-[--btn-ok-color] text-[0.4rem] w-[10px] h-full flex items-center justify-center hover:bg-[--btn-ok-bg]":
                true,
            },
            {
              "bg-[--btn-ok-bg]": isResizing,
            },
            {
              " bg-[#9E9E9E]": !isResizing,
            }
          )}
        >
          <CircleIcon
            fontSize="inherit"
            style={{
              transform: "rotate(90deg)",
            }}
          />
        </div>
      }
    >
      <div
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onBlur={onClickOutside}
        onClick={onClick}
        onDoubleClick={() =>
          router.push(
            `/${workspaceSlice.workspace?.general_information.slug}/project/${pos.project.slug}/overview`
          )
        }
        id={`event-${pos.project.id}`}
        ref={setNodeRef}
        key={pos.project.id}
        style={{
          marginLeft: pos.start + "px",
          width: width + "px",
          background: StatusColors["Backlog"],
          boxSizing: "border-box",
          cursor: "grab",
          ...style,
        }}
        {...listeners}
        {...attributes}
        className={clsx(
          {
            "h-[35px] text-[#ffffff] box-border shadow-sm text-[0.8rem] relative select-none flex items-center pl-[10px] rounded-md border-solid z-[600]":
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
        {(updatedX || isResizing) && draggingOnDate && (
          <div
            className="absolute bg-[--btn-ok-bg]  text-[white] text-[0.75rem] whitespace-nowrap
        -translate-y-[45px] z-[600] px-[15px] py-[5px] rounded-md select-none opacity-90"
          >
            {moment(draggingOnDate.start).format("ddd, MMM DD")} -{" "}
            {moment(draggingOnDate.target).format("ddd, MMM DD")} (
            {moment(draggingOnDate.target).diff(
              moment(draggingOnDate.start),
              "days"
            )}
            &nbsp;days)
          </div>
        )}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {pos.project.name}
        </div>
      </div>
    </Resizable>
  );
};
