"use client";

import { State } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const NewProject = () => {
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const router = useRouter();

  return (
    <div className="absolute bg-[--primary] top-0 left-0 w-screen h-screen z-[600] flex flex-col py-[20px] px-[40px]">
      <div className="w-full">
        <div
          onClick={() =>
            router.push(
              `/${workspaceSlice.workspace?.general_information.slug}/projects?view_mode=table`
            )
          }
        >
          Back
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-[50%] flex flex-col">
            <div className="w-full text-[--base] text-[1.5rem] mb-[30px]">
              Create New project
            </div>
            <div className="w-full flex flex-col gap-[10px] mb-[20px]">
              <div className="w-full text-[--base] text-[0.9rem]">
                Project name
              </div>
              <div className="w-full">
                <input className="w-full py-[8px] px-[10px] text-[--base] rounded-sm outline-none bg-[--selected-bg]" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-[10px] mb-[20px]">
              <div className="w-full text-[--base] text-[0.9rem]">
                Project name
              </div>
              <div className="w-full">
                <input className="w-full py-[8px] px-[10px] text-[--base] rounded-sm outline-none bg-[--selected-bg]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
