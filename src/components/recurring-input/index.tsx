"use client";

import {
  ByWeekDayRule,
  RecurringConfig,
  RecurringType,
} from "@/db/repositories/task-entities.repo";
import { dayNames, fulldayNames } from "@/lib/datetime";
import { useEffect, useState } from "react";

export default function RecurringInput() {
  const [recurringType, setRecurringType] = useState(
    RecurringType.DAILY.toString()
  );
  const [byWeekDayRule, setByWeekDayRule] = useState<ByWeekDayRule | null>(
    null
  );

  useEffect(() => {
    if (recurringType.includes("byweekday")) {
      if (!byWeekDayRule) {
        setByWeekDayRule({
          day: 0,
          every: 1,
        });
      }
    }
  }, [recurringType]);

  return (
    <div className="flex-1 flex2 items-center gap-[15px]">
      <select
        value={recurringType}
        onChange={(e) => setRecurringType(e.target.value)}
        className="w-[150px] text-left px-[10px] rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color] outline-none
                  text-[0.825rem] py-[6px] select-none hover:bg-[--hover-bg] mr-[10px]"
      >
        <option value={RecurringType.DAILY}>Everyday</option>
        <option value={RecurringType.WEEKLY}>Every week</option>
        <option value={RecurringType.MONTHLY}>Every month</option>
        <option
          value={RecurringType.MONTHLY + "_" + "byweekday"}
        >{`Every month's`}</option>
        <option value={RecurringType.YEARLY}>Every year</option>
        <option
          value={RecurringType.YEARLY + "_" + "byweekday"}
        >{`Every year's`}</option>
        <option value={"EVERY"}>{`Every...`}</option>
      </select>
      {recurringType.includes("byweekday") && byWeekDayRule && (
        <>
          <select
            value={byWeekDayRule.every}
            onChange={(e) => {
              setByWeekDayRule({
                ...byWeekDayRule,
                every: parseInt(e.target.value),
              });
            }}
            className="w-[100px] text-left px-[10px] rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color] outline-none
                  text-[0.825rem] py-[6px] select-none hover:bg-[--hover-bg] mr-[10px]"
          >
            <option value={1}>First</option>
            <option value={2}>Second</option>
            <option value={3}>Third</option>
            <option value={4}>Fourth</option>
          </select>
          <select
            onChange={(e) => {
              setByWeekDayRule({
                ...byWeekDayRule,
                day: parseInt(e.target.value),
              });
            }}
            value={byWeekDayRule.day}
            className="w-[130px] text-left px-[10px] rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color] outline-none
                  text-[0.825rem] py-[6px] select-none hover:bg-[--hover-bg]"
          >
            {fulldayNames.slice(0, -1).map((dayName, i) => (
              <option key={i} value={i}>
                {dayName}
              </option>
            ))}
          </select>
        </>
      )}
      {recurringType === "EVERY" && (
        <>
          <select
            className="w-[80px] text-left px-[10px] rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color] outline-none
                  text-[0.825rem] py-[6px] select-none hover:bg-[--hover-bg] mr-[10px]"
          >
            {Array(30)
              .fill("")
              .map((_, i) => (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              ))}
          </select>
          <select
            className="w-[100px] text-left px-[10px] rounded-md border-solid border-[1px] 
                  border-[--border-color] hover:border-[--text-header-color] outline-none
                  text-[0.825rem] py-[6px] select-none hover:bg-[--hover-bg]"
          >
            <option>days</option>
            <option>weeks</option>
            <option>months</option>
            <option>years</option>
          </select>
        </>
      )}
    </div>
  );
}
