export enum WorkspaceRoleEnum {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type WorkspaceRole = {
  id: number;
  name: WorkspaceRoleEnum;
};

export const WorkspaceRoles: WorkspaceRole[] = [
  {
    id: 0,
    name: WorkspaceRoleEnum.ADMIN,
  },
  {
    id: 1,
    name: WorkspaceRoleEnum.MEMBER,
  },
];
