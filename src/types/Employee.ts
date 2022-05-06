import { Role } from "./Role";
import { User } from "./UserTypes";

export type Employee = {
  id: number;
  role: Role;
  user: User;
};
