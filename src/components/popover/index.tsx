"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export default function Popover({
  open,
  onClickOutside,
  position,
  anchorEle,
  children,
  style,
}: {
  open: boolean;
  position:
    | "left"
    | "right"
    | "bottom left"
    | "bottom right"
    | "bottom"
    | "center left"
    | "center right";
  anchorEle: HTMLDivElement | null;
  children: React.ReactNode;
  onClickOutside?: () => void;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!anchorEle || !ref || !ref.current) return;
    switch (position) {
      case "left":
        setLeft(anchorEle.offsetLeft - ref.current.offsetWidth);
        setTop(anchorEle.offsetTop);
        break;
      case "right":
        setLeft(anchorEle.offsetLeft + anchorEle.offsetWidth);
        setTop(anchorEle.offsetTop);
        break;
      case "bottom":
        setLeft(anchorEle.offsetLeft);
        setTop(anchorEle.offsetTop + anchorEle.offsetHeight);
        break;
      case "bottom left":
        setLeft(anchorEle.offsetLeft - ref.current.offsetWidth);
        setTop(anchorEle.offsetTop + anchorEle.offsetHeight);
        break;
      case "bottom right":
        setLeft(anchorEle.offsetLeft + anchorEle.offsetWidth);
        setTop(anchorEle.offsetTop + anchorEle.offsetHeight);
        break;
      case "center right":
        setLeft(anchorEle.offsetLeft + anchorEle.offsetWidth);
        setTop(anchorEle.clientTop - anchorEle.offsetHeight);
        break;
      case "center left":
        setLeft(anchorEle.offsetLeft - ref.current.offsetWidth);
        setTop(anchorEle.clientTop - anchorEle.offsetHeight);
        break;
    }
  }, [position, anchorEle]);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
      anchorEle?.classList.add("vulh-hover-bg");
      anchorEle?.classList.add("vulh-anchor-popover-on");
    } else {
      anchorEle?.classList.remove("vulh-hover-bg");
      anchorEle?.classList.remove("vulh-anchor-popover-on");
    }
  }, [open, anchorEle]);

  return (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget) && onClickOutside) {
          anchorEle?.classList.remove("vulh-hover-bg");
          anchorEle?.classList.remove("vulh-anchor-popover-on");
          onClickOutside();
        }
      }}
      tabIndex={0}
      ref={ref}
      style={{
        left: left + "px",
        top: top + "px",
        transformOrigin: "top left",
        transition: "opacity 0.08s ease, transform 0.1s ease",
        transform: open ? "scale(1)" : "scale(0)",
        opacity: open ? "1" : "0",
        ...style,
      }}
      className="absolute z-[500] bg-[--modal-bg] text-[--base] border-solid rounded-md shadow-md
                border-[1px] border-[--border-color] flex items-center outline-none"
    >
      {children}
    </div>
  );
}
