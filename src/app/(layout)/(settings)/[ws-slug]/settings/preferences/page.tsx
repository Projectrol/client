"use client";

import useTheme from "@/hooks/useTheme";
import { UsersService } from "@/services/api/users-service";
import { setUser } from "@/services/redux/slices/user";
import { State } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Preferences = () => {
  const userSlice = useSelector((state: State) => state.user);
  const dispatch = useDispatch();

  const updateTheme = async (theme: "DARK" | "LIGHT") => {
    if (!userSlice.user) return;
    const { name, avatar, phone_no } = userSlice.user.settings;
    const response = await UsersService.UpdateUserSettings({
      name,
      phone_no: phone_no ?? "",
      avatar: avatar ?? "",
      theme,
    });
    if (response.status === "fail") {
      return;
    }
    const user = Object.assign({}, userSlice.user);
    user.settings = response.data.settings;
    dispatch(setUser(user));
  };

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
          value={userSlice.user?.settings.theme}
          onChange={(e) => {
            updateTheme(e.target.value as "DARK" | "LIGHT");
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
