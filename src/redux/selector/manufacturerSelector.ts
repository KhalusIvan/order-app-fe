import { RootState } from "../store";

export const getManufacturersSelector = (state: RootState) => {
  return state.manufacturerReducer;
};

export const getManufacturerByIdSelector = (state: RootState) => {
  return state.manufacturerReducer.rows;
};
