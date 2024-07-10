"use client";

import Loading from "@/app/loading";
import { UsersService } from "@/services/api/users-service";
import { Permission, ResourceTag } from "@/services/api/workspaces-service";
import { setUser } from "@/services/redux/slices/user";
import { State } from "@/services/redux/store";
import usePermissions from "@/services/rquery/hooks/use-permissions";
import { Tuple } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PermissionGroup from "./permission-group";

const Permissions = () => {
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
      <div className="w-full flex flex-col -mt-[30px]">
        <div className="w-full flex flex-col mt-[60px] bg-[--secondary] px-[30px] py-[30px] rounded-md border-solid shadow-sm">
          <div className="w-full flex pb-[20px]">
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
