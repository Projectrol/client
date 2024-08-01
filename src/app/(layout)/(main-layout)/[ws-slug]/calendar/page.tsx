"use client";

import Calendar from "@/components/calendar";
import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import Modal from "@/components/modal";
import { StatusColors } from "@/configs/status-colors";
import { getTotalDaysInMonth, monthNames } from "@/lib/datetime";
import useProjects from "@/services/rquery/queries/useProjects";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateTaskModal from "./components/create-task-modal";
import useCalendar from "@/hooks/use-calendar";
import { Project } from "@/services/api/projects-service";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";

export default function CalendarPage() {
  const {
    weeksOfMonth,
    weekOfMonth,
    setWeekNo,
    weekNo,
    currentMonthIndex,
    setCurrentMonthIndex,
    jumpToTargetDate,
    jumpToSpecificWeekOfMonthIndex,
    currMonthWeeksCount,
    year: currentYear,
    setYear: setCurrentYear,
  } = useCalendar();

  const [cellsRenderData, setCellsRenderData] = useState<
    {
      project: Project;
      data: {
        dateId: string;
        data: React.ReactNode;
      }[];
    }[]
  >([]);
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const { projects, isLoadingProjects } = useProjects(workspaceSlice.workspace);
  const [taskInstances, setTaskInstances] = useState<any[]>([]);
  const [isOpenCreateTaskModal, setOpenCreateTaskModal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    jumpToTargetDate(date.getDate(), date.getMonth(), date.getFullYear());
  }, []);

  useEffect(() => {
    const cellsRenderData: {
      project: Project;
      data: {
        dateId: string;
        data: React.ReactNode;
      }[];
    }[] = [];
  }, []);

  const createTask = async () => {
    // const date = new Date();
    // date.setHours(9);
    // await db.taskEntities.create({
    //   description: "Test",
    //   dtstart: date,
    //   duration: 3600,
    //   title: "Test",
    //   recurring: {
    //     count: 10,
    //     interval: 1,
    //     type: RecurringType.MONTHLY,
    //     byweekdayRule: {
    //       day: 1,
    //       every: 1,
    //     },
    //   },
    // });
    // router.refresh();
  };

  useEffect(() => {
    // const getTasks = async () => {
    //   const fromDate = new Date(
    //     currentYear,
    //     weekOfMonth[0].monthIndex,
    //     weekOfMonth[0].date
    //   );
    //   const toDate = new Date(
    //     currentYear,
    //     weekOfMonth[weekOfMonth.length - 1].monthIndex,
    //     weekOfMonth[weekOfMonth.length - 1].date
    //   );
    //   const _taskInstances = await db.taskInstances.getByDateRange(
    //     fromDate,
    //     toDate
    //   );
    //   setTaskInstances(_taskInstances);
    // };
    // if (weekOfMonth.length > 0) {
    //   getTasks();
    // }
  }, [weekOfMonth, currentYear]);

  return (
    <div className="w-full flex flex-col h-full items-center justify-start rounded-lg gap-[10px] bg-[--primary]">
      <MainBodyHeader title="Calendar" leftStyle={{ padding: "15px 0" }} />
      <div className="w-full flex-1 overflow-y-auto flex flex-col items-center pb-[100px]">
        <button onClick={() => setOpenCreateTaskModal(true)}>
          Create task
        </button>
        {/* <div className="w-[95%] h-[50px] py-[10px] flex gap-[10px]">
        <button
          onClick={() => {
            if (currentMonthIndex > 0) {
              setCurrentMonthIndex(currentMonthIndex - 1);
            } else {
              setCurrentYear(currentYear - 1);
              setCurrentMonthIndex(11);
            }
          }}
        >
          Prev
        </button>
        <div className="w-[200px] flex justify-center select-none">
          {monthNames[currentMonthIndex]} {currentYear}{" "}
        </div>
        <button
          onClick={() => {
            if (currentMonthIndex < 11) {
              setCurrentMonthIndex(currentMonthIndex + 1);
            } else {
              setCurrentYear(currentYear + 1);
              setCurrentMonthIndex(0);
            }
          }}
        >
          Next
        </button>
      </div> */}
        <div className="w-[95%] h-[50px] py-[10px] flex gap-[10px]">
          <button
            onClick={() => {
              if (weekNo > 0) {
                setWeekNo(weekNo - 1);
              } else {
                if (currentMonthIndex === 0 && weekNo === 0) {
                  jumpToSpecificWeekOfMonthIndex(11, currentYear - 1, -1);
                } else {
                  jumpToSpecificWeekOfMonthIndex(
                    currentMonthIndex - 1,
                    currentYear,
                    -1
                  );
                }
              }
            }}
          >
            Prev
          </button>
          <div className="w-[200px] flex justify-center select-none">
            {monthNames[currentMonthIndex]} {currentYear} Week {weekNo + 1}
          </div>
          <button
            onClick={() => {
              if (weekNo < currMonthWeeksCount - 1) {
                setWeekNo(weekNo + 1);
              } else {
                if (currentMonthIndex === 11) {
                  jumpToSpecificWeekOfMonthIndex(0, currentYear + 1, 0);
                } else {
                  setCurrentMonthIndex(currentMonthIndex + 1);
                  setWeekNo(0);
                }
              }
            }}
          >
            Next
          </button>
        </div>
        <Calendar
          style={{ width: "98%" }}
          weekOfMonth={weekOfMonth}
          weeksOfMonth={weeksOfMonth}
          currentYear={currentYear}
          currentMonthIndex={currentMonthIndex}
          hideWeekend={true}
          taskInstances={taskInstances}
        />
        <Modal
          showFooter={false}
          isOpen={isOpenCreateTaskModal}
          close={() => {
            setOpenCreateTaskModal(false);
          }}
        >
          <div className="w-[1200px] h-[650px] relative">
            <CreateTaskModal onCancel={() => setOpenCreateTaskModal(false)} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
