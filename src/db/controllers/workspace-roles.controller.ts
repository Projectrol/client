import { WorkspaceRole, WorkspaceRoles } from "../repositories/workspace-role";

export const WorkspaceRolesController = {
  getRoleById(id: number): WorkspaceRole | null {
    return WorkspaceRoles.find((r) => r.id === id) ?? null;
  },
};
