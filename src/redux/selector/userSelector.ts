import { RootState } from "../store";

export const getUserSelector = (state: RootState) => {
  return state.userReducer.user;
};

export const getCheckedSelector = (state: RootState) => {
  return state.userReducer.checked;
};
