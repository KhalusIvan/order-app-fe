import { Role } from "../Role";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentWorkspace: { id: number; name: string; role: Role } | null;
};
