import { RootState } from "../store";

export const getManufacturersSelector = (state: RootState) => {
  return state.manufacturerReducer;
};

export const getManufacturerByIdSelector =
  (id: number | null) => (state: RootState) => {
    console.log(id);
    return state.manufacturerReducer.rows;
  };

export const getManufacturerCurrencyListSelector = (state: RootState) => {
  return state.manufacturerReducer.currencyList || [];
};
