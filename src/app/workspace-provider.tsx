"use client";

import { db } from "@/db";
import { setWorkspace } from "@/services/redux/slices/workspace";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const workspace = db.workspaces.getWorkspaceInfo(0);
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [dispatch]);

  return children;
};

export default WorkspaceProvider;
