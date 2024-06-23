"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DatePicker({
  value,
  onSelect,
}: {
  value: any;

  onSelect: (value: any) => void;
}) {
  return (
    <DayPicker
      captionLayout="dropdown"
      mode="single"
      selected={value}
      onSelect={onSelect}
      style={{
        padding: "15px",
        fontSize: "0.9rem",
        background: "var(--primary)",
      }}
      footer
    />
  );
}
