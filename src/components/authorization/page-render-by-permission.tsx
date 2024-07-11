"use client";

import Loading from "@/app/loading";
import { PermissionType, ResourceTag } from "@/services/api/workspaces-service";
import { State } from "@/services/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PageRenderByPermission({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setChecking] = useState(true);
  const [isValid, setValid] = useState(false);
  const userPermissions = useSelector((state: State) => state.user.permissions);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathName && userPermissions.length > 0) {
      const resourceTag = pathName.split("/").slice(-1)[0];

      const isValid =
        userPermissions.findIndex(
          (uP) => uP.resource_tag === resourceTag && uP.can_read
        ) !== -1;
      setValid(isValid);
      if (!isValid) {
        router.push("/");
      }
      setChecking(false);
    }
  }, [userPermissions, pathName, router]);

  if (isChecking) return <Loading />;

  if (!isChecking && isValid) {
    return children;
  }
}
