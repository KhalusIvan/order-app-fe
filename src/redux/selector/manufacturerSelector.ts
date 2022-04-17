import { RootState } from "../store";

export const getManufacturersSelector = (state: RootState) => {
  return state.manufacturerReducer;
};

export const getManufacturerByIdSelector =
  (id: number | null) => (state: RootState) => {
    const finded = state.manufacturerReducer.rows.find((el) => el.id === id);
    if (!id || !finded) return null;
    return {
      ...finded,
      currency: {
        ...finded.currency,
        name: `${finded.currency.name} (${finded.currency.code})`,
      },
    };
  };

export const getManufacturerCurrencyListSelector = (state: RootState) => {
  return state.manufacturerReducer.currencyList || [];
};
