import { users } from "./users.repo";
import { WorkspaceRoles } from "./workspace-role";
import { workspaces } from "./workspaces.repo";

export type WorkspaceUser = {
  workspaceID: number;
  userID: number;
  workspaceRoleID: number;
};

const id0 = `${workspaces[0].id}-${users[0].id}`;
const id2 = `${workspaces[0].id}-${users[1].id}`;
const id3 = `${workspaces[0].id}-${users[4].id}`;

export const workspaceUsers: Record<string, number> = {
  [id0]: WorkspaceRoles[0].id,
  [id2]: WorkspaceRoles[1].id,
  [id3]: WorkspaceRoles[1].id,
};
