"use client";

import { PermissionType, ResourceTag } from "@/services/api/workspaces-service";
import { useUserStore } from "@/services/zustand/user-store";

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
  const { permissions } = useUserStore();
  const isValid =
    permissions.findIndex(
      (uP) =>
        uP.resource_tag === requiredPermission.resourceTag &&
        uP[requiredPermission.permissionType]
    ) !== -1;
  if (!isValid) return null;
  return children;
}
