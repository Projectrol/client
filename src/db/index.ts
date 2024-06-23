import { ProjectsController } from "./controllers/projects.controller";
import { UsersController } from "./controllers/users.controller";
import { WorkspacesController } from "./controllers/workspaces.controller";

export const db = {
  users: UsersController,
  projects: ProjectsController,
  workspaces: WorkspacesController,
};
