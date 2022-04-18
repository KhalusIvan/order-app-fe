import { RootState } from "../store";

export const getUserSelector = (state: RootState) => {
  return state.userReducer.user;
};

export const getUserCurrentWorkspaceSelector = (state: RootState) => {
  return state.userReducer.user?.currentWorkspace?.id;
};

export const getCheckedSelector = (state: RootState) => {
  return state.userReducer.checked;
};
