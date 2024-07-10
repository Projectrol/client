"use client";

import Button from "@/components/button";
import { BUTTON_TYPES } from "@/configs/themes";
import useTheme from "@/hooks/useTheme";
import { UsersService } from "@/services/api/users-service";
import { setUser } from "@/services/redux/slices/user";
import { State } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
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
    <div className="w-full flex flex-col items-start justify-start">
      <div className="w-full flex flex-col mt-[60px]">
        <div className="w-full text-[1rem] text-[--base] font-semibold mb-[15px]">
          Name
        </div>
        <input
          className="text-[--base] bg-[--primary] outline-none 
                  border-solid border-[1px] text-[0.85rem] w-[300px]
                  border-[--border-color] font-semibold py-[8px] px-[10px] rounded-md shadow-sm"
          value={userSlice.user?.settings.name}
        />
      </div>
      <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
      <div className="w-full flex flex-col mt-[30px]">
        <div className="w-full text-[1rem] text-[--base] font-semibold mb-[15px]">
          Phone number
        </div>
        <input
          placeholder="Enter your phone number"
          className="text-[--base] bg-[--primary] outline-none 
                  border-solid border-[1px] text-[0.85rem] w-[300px]
                  border-[--border-color] font-semibold py-[8px] px-[10px] rounded-md shadow-sm"
          value={userSlice.user?.settings.phone_no}
        />
      </div>
      <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
      <div className="w-full flex flex-col mt-[30px] justify-start items-end">
        <Button
          type={BUTTON_TYPES.OK}
          disabled={false}
          style={{
            padding: "10px 40px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
          onClick={() => {}}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default Profile;
