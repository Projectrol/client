import { User } from "../repositories/users.repo";
import { WorkspaceRoleEnum } from "../repositories/workspace-role";
import { workspaceUsers } from "../repositories/workspace-user.repo";
import { Workspace, workspaces } from "../repositories/workspaces.repo";
import { UsersController } from "./users.controller";
import { WorkspaceRolesController } from "./workspace-roles.controller";

export const WorkspacesController = {
  getWorkspaceInfo(id: number): Workspace | null {
    return workspaces.find((ws) => ws.id === id) ?? null;
  },
  getWorkspaceMembers(id: number): Array<{ role: WorkspaceRoleEnum } & User> {
    const members: Array<{ role: WorkspaceRoleEnum } & User> = [];
    for (let key in workspaceUsers) {
      const wsId = key.split("-")[0];
      if (parseInt(wsId) === id) {
        const userId = key.split("-")[1];
        const user = UsersController.getUserById(parseInt(userId));
        const role = WorkspaceRolesController.getRoleById(workspaceUsers[key]);
        if (user && role) {
          members.push({ ...user, role: role.name });
        }
      }
    }
    return members;
  },
};
