"use client";

import React from "react";

export type Tab = {
  key: string;
  element: React.ReactNode;
};

export default function Tabs({
  items,
  selectedKey,
  gap = 0,
  style,
}: {
  items: Tab[];
  selectedKey: string;
  gap?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        gap: gap + "px",
        ...style,
      }}
      className="w-full flex"
    >
      {items.map((item) => (
        <div
          style={{
            opacity: selectedKey === item.key ? 1 : 0.75,
            borderBottom:
              selectedKey === item.key ? "3px solid var(--base)" : "none",
          }}
          key={item.key}
          className="py-[5px]"
        >
          {item.element}
        </div>
      ))}
    </div>
  );
}
