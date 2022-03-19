import { RootState } from "../store";

export const getAlertsSelector = (state: RootState) => {
  return state.alertReducer;
};
