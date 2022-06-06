import { RootState } from "../store";

export const getUserSelector = (state: RootState) => {
  return state.userReducer.user;
};

export const getUserCurrentWorkspaceSelector = (state: RootState) => {
  return state.userReducer.user?.currentWorkspace?.id;
};

export const getUserRoleSelector = (state: RootState) => {
  const role = state.userReducer.user?.currentWorkspace?.role;
  if (role?.name?.toLowerCase() === "власник") return 1;
  else if (role?.name?.toLowerCase() === "адміністратор") return 2;
  return 3;
};

export const getCheckedSelector = (state: RootState) => {
  return state.userReducer.checked;
};
