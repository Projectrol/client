"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/app/loading";
import {
  CreateNewRoleRequest,
  Permission,
  WorkspacesService,
} from "@/services/api/workspaces-service";
import { State } from "@/services/redux/store";
import usePermissions from "@/services/rquery/hooks/use-permissions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PermissionGroup from "./permission-group";
import { BUTTON_TYPES } from "@/configs/themes";
import Button from "@/components/button";
import { setWorkspaceRoles } from "@/services/redux/slices/workspace";

const AddRole = () => {
  const dispatch = useDispatch();
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const [isInitial, setInitial] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const userPermissions = useSelector((state: State) => state.user.permissions);
  const { permissions, getPermissionsError, isLoadingPermissions } =
    usePermissions();
  const [permissionGroups, setPermissionGroups] = useState<{
    [key: string]: Permission[];
  } | null>(null);

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

  useEffect(() => {
    if (userPermissions.length > 0) {
      const index = userPermissions.findIndex(
        (item) => item.resource_tag === "roles" && item.can_create
      );
      if (index === -1) {
        router.push("/");
      }
    }
  }, [userPermissions, router]);

  useEffect(() => {
    if (roleName.trim().length > 0 && isInitial) {
      setInitial(false);
    }
    const existed = workspaceSlice.workspaceRoles.find(
      (role) => role.role_name.toLowerCase() === roleName.toLowerCase()
    );
    if (existed) {
      setErrors((prev) => [
        ...prev,
        `role_name:A role with a name "${roleName.toLowerCase()}" is already existed this workspace`,
      ]);
    } else {
      setErrors([]);
    }
    if (roleName.trim().length === 0) {
      setErrors((prev) => [...prev, `role_name:Role name can't be empty`]);
    }
  }, [roleName, workspaceSlice]);

  const handleChange = (id: number) => {
    const isExisted = selectedIds.includes(id);
    if (!isExisted) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  const createRole = async () => {
    if (!workspaceSlice.workspace) return;
    setErrors([]);
    const wsId = workspaceSlice.workspace.general_information.id;
    const bodyData: CreateNewRoleRequest = {
      permission_ids: selectedIds,
      role_name: roleName,
      workspace_id: wsId,
    };
    const response = await WorkspacesService.CreateNewRole(wsId, bodyData);
    if (response.status === "fail") {
      handleError(response.error);
      return;
    }
    toast("Create role success", {
      type: "success",
      position: "top-center",
    });
    const getWRRolesResponse = await WorkspacesService.GetWokspaceRoles(
      workspaceSlice.workspace.general_information.id
    );
    if (getWRRolesResponse.status === "success") {
      dispatch(setWorkspaceRoles(getWRRolesResponse.data.roles));
      router.push(
        `/${workspaceSlice.workspace.general_information.slug}/settings/permissions`
      );
    }
  };

  const handleError = (error: string) => {
    setErrors([]);
    if (error.includes("duplicate")) {
      toast("Duplicated role name", {
        type: "error",
        position: "top-center",
      });
      setErrors((prev) => [
        ...prev,
        `role_name:A role with a name "${roleName.toLowerCase()}" is already existed this workspace`,
      ]);
    }
  };

  if (!permissionGroups) return <Loading />;
  if (!isLoadingPermissions && getPermissionsError) return <h1>Error</h1>;

  if (permissionGroups && userPermissions.length > 0) {
    return (
      <div className="w-full flex flex-col">
        <ToastContainer />
        <div className="w-full flex justify-end pt-[25px]">
          <Button
            disabled={errors.length > 0}
            style={{
              fontSize: "0.8rem",
              padding: "8px 14px",
              borderRadius: "4px",
            }}
            type={BUTTON_TYPES.OK}
            onClick={createRole}
          >
            Create Role
          </Button>
        </div>
        <div className="w-full flex flex-col mb-[20px]">
          <div className="w-full pb-[20px] font-medium text-[0.9rem] text-[--base]">
            Role name
          </div>
          <input
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor:
                !isInitial &&
                errors.find((error) => error.includes("role_name"))
                  ? "var(--btn-delete-bg)"
                  : "transparent",
            }}
            className={`outline-none bg-[--secondary] focus:bg-[--border-color] rounded-sm 
              transition-colors shadow-sm py-[8px] px-[12px] text-[--base] text-[0.9rem]`}
            type="text"
            placeholder="Enter role name..."
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          {!isInitial &&
            errors.find((error) => error.includes("role_name")) && (
              <span
                style={{
                  color: "var(--btn-delete-bg)",
                  fontWeight: 500,
                }}
                className="w-full pt-[8px] text-[0.85rem]"
              >
                {
                  errors
                    .find((error) => error.includes("role_name"))
                    ?.split(":")[1]
                }
              </span>
            )}
        </div>
        <div>
          <div className="w-full pb-[20px] font-medium text-[0.9rem] text-[--base]">
            Permissions
          </div>
          <div className="w-full flex flex-wrap justify-between">
            {Object.keys(permissionGroups).map((key, i) => (
              <PermissionGroup
                key={key}
                rTag={key}
                selectedIds={selectedIds}
                handleChange={handleChange}
                permissions={permissionGroups[key]}
                hideDivider={i === Object.keys(permissionGroups).length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default AddRole;
