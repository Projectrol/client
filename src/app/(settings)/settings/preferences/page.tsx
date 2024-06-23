"use client";

import useTheme from "@/hooks/useTheme";
import { useRouter } from "next/navigation";

const Preferences = () => {
  const { getTheme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col  mt-[60px]">
        <div className="w-full text-[1rem] text-[--base] font-semibold mb-[15px]">
          Theme
        </div>
        <select
          className="text-[--base] bg-[--primary] outline-none 
                  border-solid border-[1px] text-[0.85rem] w-[200px]
                  border-[--border-color] font-semibold py-[8px] px-[5px] rounded-md shadow-sm"
          value={getTheme()}
          onChange={(e) => {
            setTheme(e.target.value as "DARK" | "LIGHT");
            router.refresh();
          }}
        >
          <option value={"DARK"}>Dark</option>
          <option value={"LIGHT"}>Light</option>
        </select>
      </div>
      <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
    </div>
  );
};

export default Preferences;
