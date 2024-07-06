"use client";

import { State } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const workspaceSlice = useSelector((state: State) => state.workspace);

  useEffect(() => {
    if (workspaceSlice.workspace) {
      router.push(`/${workspaceSlice.workspace.slug}/inbox`);
    }
  }, [router, workspaceSlice]);

  return null;
}
