import { useCallback, useEffect, useState } from "react";
import { getTotalDaysInMonth, getTotalDaysInYear } from "./datetime";

export enum TimelineUnit {
  YEAR = "YEAR",
  MONTH = "MONTH",
  DAY = "DAY",
}

type TimelineGroupItem = {
  value: number;
  unit: TimelineUnit;
};

type TimelineGroup = {
  value: number;
  unit: TimelineUnit;
  items: TimelineGroupItem[];
};

type YearsMode = {
  mode: "years";
  from_year: number;
  to_year: number;
};

type MonthsInYearMode = {
  mode: "months in year";
  year: number;
};

type GroupingMode = YearsMode | MonthsInYearMode;

export default function useTimeline({
  initGroupingMode = {
    mode: "years",
    from_year: 2020,
    to_year: 2027,
  },
}: {
  initGroupingMode?: GroupingMode;
}) {
  const [groupingMode, setGroupingMode] =
    useState<GroupingMode>(initGroupingMode);
  const [groups, setGroups] = useState<TimelineGroup[]>([]);

  const handleYearsGroup = useCallback(() => {
    const mode = groupingMode as YearsMode;
    const from = mode.from_year;
    const to = mode.to_year;
    const groups: TimelineGroup[] = Array(to - from + 1)
      .fill("")
      .map((_, i) => {
        const year = from + i;
        return {
          value: year,
          unit: TimelineUnit.YEAR,
          items: Array(12)
            .fill("")
            .map((_, i) => {
              return {
                value: i + 1,
                unit: TimelineUnit.MONTH,
              };
            }),
        };
      });
    setGroups(groups);
  }, [groupingMode]);

  const handleMonthsInYearGroup = useCallback(() => {
    const mode = groupingMode as MonthsInYearMode;
    const groups: TimelineGroup[] = Array(12)
      .fill("")
      .map((_, i) => {
        const totalDaysInMonth = getTotalDaysInMonth(i + 1, mode.year);
        return {
          value: i + 1,
          unit: TimelineUnit.MONTH,
          items: Array(totalDaysInMonth)
            .fill("")
            .map((_, i) => {
              return {
                value: i + 1,
                unit: TimelineUnit.DAY,
              };
            }),
        };
      });
    setGroups(groups);
  }, [groupingMode]);

  useEffect(() => {
    if (groupingMode.mode === "years") {
      handleYearsGroup();
    }
    if (groupingMode.mode === "months in year") {
      handleMonthsInYearGroup();
    }
  }, [groupingMode, handleYearsGroup, handleMonthsInYearGroup]);

  return {
    groups,
    setGroupingMode,
    groupingMode,
  };
}
