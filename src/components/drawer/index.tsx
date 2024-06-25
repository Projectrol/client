"use client";

import { useEffect, useRef } from "react";

export enum DrawerPosition {
  "left" = "left",
  "right" = "right",
  "top" = "top",
  "bottom" = "bottom",
}

const Drawer = ({
  isOpen,
  close,
  children,
  position = DrawerPosition.right,
}: {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  position?: DrawerPosition;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const styles: { [key in DrawerPosition]: React.CSSProperties } = {
    left: {
      left: 10,
      top: 0,
      height: "100%",
      transition: "transform 0.2s ease-in",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      borderLeft: "1px solid var(--border-color)",
    },
    right: {
      right: 0,
      top: 0,
      height: "100%",
      transition: "transform 0.2s ease-in",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      borderLeft: "1px solid var(--border-color)",
    },
    top: {},
    bottom: {},
  };

  useEffect(() => {
    if (isOpen) {
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen]);

  return (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          close();
        }
      }}
      ref={ref}
      tabIndex={1}
      style={{
        position: "fixed",
        width: "300px",
        background: "var(--primary)",
        outline: "none",
        zIndex: 700,
        ...styles[position],
      }}
    >
      {children}
    </div>
  );
};

export default Drawer;
