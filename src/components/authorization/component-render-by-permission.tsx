"use client";

import { PermissionType, ResourceTag } from "@/services/api/workspaces-service";
import { State } from "@/services/redux/store";
import { useSelector } from "react-redux";

export default function ComponentRenderByPermission({
  requiredPermission,
  children,
}: {
  requiredPermission: {
    resourceTag: ResourceTag;
    permissionType: PermissionType;
  };
  children: React.ReactNode;
}) {
  const userPermissions = useSelector((state: State) => state.user.permissions);
  const isValid =
    userPermissions.findIndex(
      (uP) =>
        uP.resource_tag === requiredPermission.resourceTag &&
        uP[requiredPermission.permissionType]
    ) !== -1;
  if (!isValid) return null;
  return children;
}
