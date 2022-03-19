import { RootState } from "../store";

export const getUserSelector = (state: RootState) => {
  console.log(state.userReducer);
  return state.userReducer;
};
