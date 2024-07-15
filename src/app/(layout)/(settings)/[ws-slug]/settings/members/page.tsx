"use client";

import Table from "@/components/table";
import { UsersService } from "@/services/api/users-service";
import { setUser } from "@/services/redux/slices/user";
import { State } from "@/services/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { WorkspaceMember } from "@/services/api/workspaces-service";

const Preferences = () => {
  const userSlice = useSelector((state: State) => state.user);
  const workspaceRoles = useSelector(
    (state: State) => state.workspace.workspaceRoles
  );
  const workspaceMembers = useSelector(
    (state: State) => state.workspace.workspaceMembers
  );
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
    <div className="w-full flex flex-col bg-[--secondary] mt-[20px] pt-[10px] rounded-md shadow-md">
      <Table
        loading={false}
        data={workspaceMembers}
        columns={[
          {
            field: "email",
            headerTitle: "Email",
            width: 25,
          },
          {
            field: "name",
            headerTitle: "Name",
            width: 25,
          },
          {
            field: "phone_no",
            headerTitle: "Phone No",
            width: 25,
            customRender(item: WorkspaceMember) {
              return <h1>{item.phone_no ?? "None"}</h1>;
            },
          },
          {
            field: "role_id",
            headerTitle: "Role",
            width: 25,
            customRender(item: WorkspaceMember) {
              return (
                <h1>
                  {
                    workspaceRoles.find((role) => role.id === item.role_id)
                      ?.role_name
                  }
                </h1>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default Preferences;
