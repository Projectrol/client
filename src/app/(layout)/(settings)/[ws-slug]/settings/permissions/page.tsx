"use client";

import Loading from "@/app/loading";
import { Permission } from "@/services/api/workspaces-service";
import { State } from "@/services/redux/store";
import usePermissions from "@/services/rquery/queries/use-permissions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PermissionGroup from "./permission-group";
import Button from "@/components/button";
import { BUTTON_TYPES } from "@/configs/themes";
import { useRouter } from "next/navigation";

const Permissions = () => {
  const router = useRouter();
  const userPermissions = useSelector((state: State) => state.user.permissions);
  const { permissions, getPermissionsError, isLoadingPermissions } =
    usePermissions();
  const [permissionGroups, setPermissionGroups] = useState<{
    [key: string]: Permission[];
  } | null>(null);
  const dispatch = useDispatch();
  const wokspaceSlice = useSelector((state: State) => state.workspace);

  const groupByResourcePermissions = (permissions: Permission[]) => {
    const permissionGroups: { [key: string]: Permission[] } = {};
    permissions.forEach((p) => {
      if (permissionGroups[p.resource_tag]) {
        permissionGroups[p.resource_tag].push(p);
      } else {
        permissionGroups[p.resource_tag] = [p];
      }
    });
    setPermissionGroups(permissionGroups);
  };

  useEffect(() => {
    if (!isLoadingPermissions && permissions) {
      groupByResourcePermissions(permissions);
    }
  }, [permissions, isLoadingPermissions]);

  if (isLoadingPermissions) {
    return <Loading />;
  }

  if (!isLoadingPermissions && getPermissionsError) {
    return <h1>Error...</h1>;
  }

  if (permissionGroups) {
    return (
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-end pt-[25px]">
          <Button
            disabled={
              userPermissions.findIndex(
                (uP) => uP.resource_tag === "roles" && uP.can_create
              ) === -1
            }
            style={{
              fontSize: "0.8rem",
              padding: "8px 14px",
              borderRadius: "4px",
            }}
            type={BUTTON_TYPES.OK}
            onClick={() =>
              router.push(
                `/${wokspaceSlice.workspace?.general_information.slug}/settings/add-role`
              )
            }
          >
            Add New Role
          </Button>
        </div>
        <div className="w-full flex flex-col mt-[20px] bg-[--secondary] pt-[10px] rounded-md border-solid">
          <div className="w-full flex pb-[20px] sticky -top-[10px] mb-[30px] bg-[--secondary] items-center py-[20px] z-[10] border-solid border-b-[1px] border-b-[--border-color]">
            <div className="w-[60%] text-[--text-header-color] font-semibold text-[0.75rem] uppercase">
              Actions
            </div>
            <div className="flex-1 flex">
              {wokspaceSlice.workspaceRoles &&
                wokspaceSlice.workspaceRoles.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-1 items-center justify-center text-[--text-header-color] font-semibold text-[0.75rem] uppercase"
                  >
                    {r.role_name}
                  </div>
                ))}
            </div>
          </div>
          {Object.keys(permissionGroups).map((key, i) => (
            <PermissionGroup
              key={key}
              rTag={key}
              roles={wokspaceSlice.workspaceRoles}
              permissions={permissionGroups[key]}
              hideDivider={i === Object.keys(permissionGroups).length - 1}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Permissions;
