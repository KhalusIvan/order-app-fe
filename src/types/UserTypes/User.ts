import { Workspace } from "../Workspace";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentWorkspace: Workspace | null;
};
