"use client";

import Toggle from "react-toggle";
import "react-toggle/style.css";
import {
  Permission,
  UpdateRolePermissionRequest,
  WorkspaceRole,
  WorkspacesService,
} from "@/services/api/workspaces-service";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import { setWorkspaceRoles } from "@/services/redux/slices/workspace";

export default function PermissionGroup({
  rTag,
  permissions,
  roles,
  hideDivider,
}: {
  rTag: string;
  permissions: Permission[];
  roles?: WorkspaceRole[];
  hideDivider: boolean;
}) {
  const dispatch = useDispatch();
  const userPermissions = useSelector((state: State) => state.user.permissions);
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const checkIfChecked = (p: Permission, r: WorkspaceRole) => {
    const permissionAction = p.can_create
      ? "can_create"
      : p.can_delete
      ? "can_delete"
      : p.can_read
      ? "can_read"
      : p.can_update
      ? "can_update"
      : null;
    let checked = false;
    if (!permissionAction) return checked;
    if (!r.permissions) {
      return false;
    }
    r.permissions.forEach((rP) => {
      if (rP[permissionAction] && rP.resource_tag === rTag) {
        checked = true;
      }
    });
    return checked;
  };

  const updatePermission = async (
    checked: boolean,
    role: WorkspaceRole,
    p: Permission
  ) => {
    const permissionAction = p.can_create
      ? "can_create"
      : p.can_delete
      ? "can_delete"
      : p.can_read
      ? "can_read"
      : p.can_update
      ? "can_update"
      : null;
    if (!permissionAction || !workspaceSlice || !workspaceSlice.workspace)
      return;
    const data: UpdateRolePermissionRequest = {
      action: permissionAction,
      resource_tag: p.resource_tag,
      role_id: role.id,
      update_type: checked ? "remove" : "add",
    };
    const response = await WorkspacesService.UpdateRolePermission(
      workspaceSlice.workspace.general_information.id,
      data
    );
    if (response.status === "success") {
      const getWorkspaceRolesRes = await WorkspacesService.GetWokspaceRoles(
        workspaceSlice.workspace.general_information.id
      );
      if (getWorkspaceRolesRes.status === "success") {
        dispatch(setWorkspaceRoles(getWorkspaceRolesRes.data.roles));
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-[20px] mb-[30px]">
      <div className="w-full uppercase font-semibold text-[--base] opacity-90 text-[0.75rem] tracking-wider">
        {rTag}
      </div>
      {permissions.map((p) => (
        <div className="w-full flex" key={p.id}>
          <div className="w-[60%] flex flex-col gap-[5px] justify-center">
            <div className="w-full text-[--base] font-semibold text-[0.85rem]">
              {p.title} {rTag}
            </div>
            <div className="w-full text-[--base] font-light text-[0.85rem]">
              {p.description}
            </div>
          </div>
          {roles &&
            roles.map((role) => (
              <div
                key={role.id}
                className="flex-1 flex items-center justify-center"
              >
                <Toggle
                  disabled={
                    userPermissions.findIndex(
                      (uP) => uP.resource_tag === "roles" && uP.can_update
                    ) === -1
                  }
                  className="custom-toggle"
                  style={{
                    transform: "scale(0.8)",
                  }}
                  icons={false}
                  checked={checkIfChecked(p, role)}
                  onChange={() =>
                    updatePermission(checkIfChecked(p, role), role, p)
                  }
                />
              </div>
            ))}
        </div>
      ))}
      {!hideDivider && (
        <div className="w-full h-[1px] bg-[--border-color] mt-[20px]"></div>
      )}
    </div>
  );
}
