"use client";

import Loading from "@/app/loading";
import { useUserStore } from "@/services/zustand/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageRenderByPermission({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setChecking] = useState(true);
  const [isValid, setValid] = useState(false);
  const { permissions } = useUserStore();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathName && permissions.length > 0) {
      const resourceTag = pathName.split("/").slice(2)[0];
      const isValid =
        permissions.findIndex(
          (uP) => uP.resource_tag === resourceTag && uP.can_read
        ) !== -1;
      setValid(isValid);
      if (!isValid) {
        router.push("/");
      }
      setChecking(false);
    }
  }, [pathName, router, permissions]);

  if (isChecking) return <Loading />;

  if (!isChecking && isValid) {
    return children;
  }
}
