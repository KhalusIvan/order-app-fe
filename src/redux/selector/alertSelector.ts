import { RootState } from "../store";

export const getAlerts = (state: RootState) => {
  return state.alertReducer;
};
