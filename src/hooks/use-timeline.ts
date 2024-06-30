import { useCallback, useEffect, useState } from "react";
import { getTotalDaysInMonth } from "../lib/datetime";

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

type MonthsInYearsMode = {
  mode: "months in years";
  from_year: number;
  to_year: number;
};

type GroupingMode = YearsMode | MonthsInYearsMode;

export default function useTimeline({
  initGroupingMode = {
    mode: "years",
    from_year: 2023,
    to_year: 2026,
  },
}: {
  initGroupingMode?: GroupingMode;
}) {
  const [groupingMode, setGroupingMode] =
    useState<GroupingMode>(initGroupingMode);
  const [groups, setGroups] = useState<TimelineGroup[]>([]);
  const [monthsInYears, setMonthsInYears] = useState<
    {
      value: number;
      unit: TimelineUnit;
      groups: TimelineGroup[];
    }[]
  >([]);

  const handleYearsGroup = useCallback(() => {
    const mode = groupingMode as YearsMode;
    const from = mode.from_year;
    const to = mode.to_year;
    const groups: TimelineGroup[] = Array(to - from + 1)
      .fill("")
      .map((_, yIndex) => {
        const year = from + yIndex;
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

  const handleMonthsInYearsGroup = useCallback(() => {
    const mode = groupingMode as MonthsInYearsMode;
    const _monthsInYears: {
      value: number;
      unit: TimelineUnit;
      groups: TimelineGroup[];
    }[] = [];
    Array(mode.to_year - mode.from_year + 1)
      .fill("")
      .forEach((_, i) => {
        const year = i + mode.from_year;
        const groups: TimelineGroup[] = Array(12)
          .fill("")
          .map((_, mIndex) => {
            const totalDaysInMonth = getTotalDaysInMonth(mIndex, year);
            return {
              value: mIndex + 1,
              unit: TimelineUnit.MONTH,
              items: Array(totalDaysInMonth)
                .fill("")
                .map((_, dIndex) => {
                  return {
                    value: dIndex + 1,
                    unit: TimelineUnit.DAY,
                  };
                }),
            };
          });
        _monthsInYears.push({ groups, value: year, unit: TimelineUnit.YEAR });
      });
    setMonthsInYears(_monthsInYears);
  }, [groupingMode]);

  useEffect(() => {
    if (groupingMode.mode === "years") {
      handleYearsGroup();
    }
    if (groupingMode.mode === "months in years") {
      handleMonthsInYearsGroup();
    }
  }, [groupingMode, handleYearsGroup, handleMonthsInYearsGroup]);

  return {
    monthsInYears,
    groups,
    setGroupingMode,
    groupingMode,
  };
}
