"use client";

import Popover from "@/components/popover";
import { db } from "@/db";
import { User } from "@/db/repositories/users.repo";
import { WorkspaceRoleEnum } from "@/db/repositories/workspace-role";
import { PluginElementRenderProps } from "@yoopta/editor";
import { useEffect, useRef, useState } from "react";

export default function AssignPersonRenderElement({
  attributes,
  children,
}: PluginElementRenderProps) {
  const anchorEle = useRef<HTMLDivElement>(null);
  const [wsMembers, setWSMembers] = useState<
    ({
      role: WorkspaceRoleEnum;
    } & User)[]
  >();

  useEffect(() => {
    const getWSMembers = async () => {
      const members = db.workspaces.getWorkspaceMembers(0);
      if (members?.length > 0) {
        setWSMembers(members);
      }
    };
    getWSMembers();
  }, []);

  return (
    <div
      {...attributes}
      className="flex relative"
      contentEditable={false}
      ref={anchorEle}
    >
      {children}
      {anchorEle.current && (
        <div
          style={{}}
          className="h-[50px] w-[200px] bg-[--modal-bg] fixed z-[400] shadow-md"
        >
          {anchorEle.current.offsetTop}
        </div>
      )}
    </div>
  );
}
