import { RootState } from "../store";

export const getManufacturersSelector = (state: RootState) => {
  return state.manufacturerReducer;
};
