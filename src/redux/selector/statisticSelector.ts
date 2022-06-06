import { RootState } from "../store";

export const getStatisticsSelector = (state: RootState) => {
  return state.statisticReducer;
};
