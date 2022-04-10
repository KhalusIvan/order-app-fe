import { Workspace } from "./Workspace";
import { Role } from "./Role";

export type WorkspaceRequest = {
  id: number;
  role: Role;
  workspace: Workspace;
};
