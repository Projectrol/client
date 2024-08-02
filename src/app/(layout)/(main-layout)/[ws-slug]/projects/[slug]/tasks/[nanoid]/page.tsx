"use client";

import { TasksServices } from "@/services/api/tasks-services";
import { State } from "@/services/redux/store";
import useProjectTaskDetails from "@/services/rquery/queries/use-project-task-details";
import moment from "moment";
import { useSelector } from "react-redux";

export default function TaskDetails({
  params,
}: {
  params: { nanoid: string; slug: string };
}) {
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const { details, error, isLoading } = useProjectTaskDetails(
    workspaceSlice.workspace?.general_information.id,
    params.slug,
    params.nanoid
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-[50px] py-[50px] flex flex-col">
        <div className="w-full text-[--base] font-semibold text-[1.7rem]">
          {details?.task.title}
        </div>
        <div className="w-full text-[--base] font-medium text-[0.95rem] pt-[20px] pb-[40px]">
          {details?.task.description}
        </div>
        <div className="w-full h-[1px] bg-[--border-color]" />
        <div className="w-full text-[--base] font-semibold pt-[20px]">
          Activities
        </div>
        <div className="w-full flex flex-col py-[20px] gap-[20px]">
          {details &&
            details.task_logs?.length > 0 &&
            details.task_logs.map((log, lIndex) => (
              <>
                <div className="w-full flex flex-col gap-[5px] bg-[--primary] py-[15px] px-[15px] rounded-lg shadow-md">
                  <div className="text-[--base] text-[0.75rem] font-medium">
                    userId {log.created_by} changed {log.changed_field} from{" "}
                    {`${log.old_value} to ${log.new_value}`}
                  </div>
                  <div className="text-[--base] text-[0.75rem] font-medium">
                    {moment(log.created_at).fromNow()}
                  </div>
                </div>
                <div className="w-[2px] h-[14px] bg-[--base] opacity-20" />
              </>
            ))}
          <div className="w-full flex flex-col gap-[5px] bg-[--primary] py-[15px] px-[15px] rounded-lg shadow-md">
            <div className="text-[--base] text-[0.825rem] font-medium">
              userId {details?.task.created_by} created the task
            </div>
            <div className="text-[--base] text-[0.85rem] font-medium">
              {moment(details?.task.created_at).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
