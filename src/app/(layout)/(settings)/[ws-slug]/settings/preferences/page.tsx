"use client";

import { UsersService } from "@/services/api/users-service";
import { State } from "@/services/redux/store";
import { useUserStore } from "@/services/zustand/user-store";

const Preferences = () => {
  const userStore = useUserStore();

  const updateTheme = async (theme: "DARK" | "LIGHT") => {
    if (!userStore.user) return;
    const { name, avatar, phone_no } = userStore.user.settings;
    const response = await UsersService.UpdateUserSettings({
      name,
      phone_no: phone_no ?? "",
      avatar: avatar ?? "",
      theme,
    });
    if (response.status === "fail") {
      return;
    }
    const user = Object.assign({}, userStore.user);
    user.settings = response.data.settings;
    userStore.setUser(user);
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
          value={userStore.user?.settings.theme}
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
