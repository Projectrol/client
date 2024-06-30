"use client";

import { useEffect, useRef, useState } from "react";
import Popover from "../popover";
import { isNumeric } from "validator";

export default function DurationInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [durationTxtValue, setDurationTxtValue] = useState("");
  const [suggestionValue, setSuggestionValue] = useState("");

  useEffect(() => {
    if (durationTxtValue.trim().length === 0) return;
    if (isNumeric(durationTxtValue)) {
      setSuggestionValue(
        `${durationTxtValue} ${
          parseInt(durationTxtValue) > 1 ? "hours" : "hour"
        }`
      );
    } else {
      if (hours === 0) {
        if (durationTxtValue.toLowerCase().includes("m")) {
          if (minutes > 0) return;
          const _minutes = durationTxtValue.trim().split("m")[0];
          setSuggestionValue(
            `${_minutes} ${
              parseInt(_minutes.trim()) > 1 ? "minutes" : "minute"
            }`
          );
          setMinutes(parseInt(_minutes));
        }
        if (durationTxtValue.toLowerCase().includes("h")) {
          const hours = durationTxtValue.trim().split("h")[0];
          setSuggestionValue(
            `${hours} ${parseInt(hours.trim()) > 1 ? "hours" : "hour"}`
          );
        }
      } else {
        const strToSlit = hours > 1 ? "hours" : "hour";
        if (durationTxtValue.toLowerCase().includes(strToSlit)) {
          const withoutHourTxt = durationTxtValue.split(strToSlit)[1];
          if (isNumeric(withoutHourTxt.trim())) {
            let minutes = parseInt(withoutHourTxt.trim());
            if (minutes > 59) {
              const minutesToHours = Math.floor(minutes / 60);
              minutes = Math.floor(minutes % 60);
              setSuggestionValue(
                `${minutesToHours + hours} ${
                  minutesToHours + hours > 1 ? "hours" : "hour"
                }${minutes > 0 ? " " + minutes : ""}${
                  minutes > 0 ? (minutes > 1 ? " minutes" : " minute") : ""
                }`
              );
            } else {
              setSuggestionValue(
                `${durationTxtValue} ${
                  parseInt(withoutHourTxt.trim()) > 1 ? "minutes" : "minute"
                }`
              );
            }
          } else {
            setSuggestionValue("");
          }
        }
      }
    }
  }, [durationTxtValue, hours]);

  useEffect(() => {
    if (durationTxtValue.trim().length === 0) return;
    if (durationTxtValue.includes("hour")) {
      if (durationTxtValue.includes("hour")) {
        setHours(parseInt(durationTxtValue.split("hour")[0]));
      } else {
        setHours(parseInt(durationTxtValue.split("hours")[0]));
      }
    }
  }, [durationTxtValue]);

  const convertDurationStrToDuration = (): {
    hours: number;
    minutes: number;
  } => {
    let hours = 0;
    let minutes = 0;
    if (durationTxtValue.trim().length === 0)
      return {
        hours,
        minutes,
      };
    if (durationTxtValue.includes("hour")) {
      if (durationTxtValue.includes("hour")) {
        hours = parseInt(durationTxtValue.split("hour")[0]);
      } else {
        minutes = parseInt(durationTxtValue.split("hours")[0]);
      }
    }
    return {
      hours,
      minutes,
    };
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        value={durationTxtValue}
        onChange={(e) => setDurationTxtValue(e.target.value)}
        className="w-full px-[8px] py-[6px] outline-none border-solid border-[1px] text-[0.9rem] 
        rounded-md border-[--border-color] hover:border-[--text-header-color]"
        placeholder="Input duration"
      />
      <Popover
        autoFocus={false}
        open={suggestionValue !== ""}
        anchorEle={inputRef.current}
        onClickOutside={() => setSuggestionValue("")}
        position="bottom"
      >
        <div
          onClick={() => {
            setDurationTxtValue(suggestionValue.trim());
            setSuggestionValue("");
          }}
          className="px-[20px] py-[4px] text-[0.85rem] text-[--base] cursor-pointer"
        >
          {suggestionValue}
        </div>
      </Popover>
    </div>
  );
}
