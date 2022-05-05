import { RootState } from "../store";

export const getCustomersSelector = (state: RootState) => {
  return state.customerReducer;
};

export const getCustomerByIdSelector =
  (id: number | null) => (state: RootState) => {
    const finded = state.customerReducer.rows.find((el) => el.id === id);
    if (!id || !finded) return null;
    return {
      ...finded,
    };
  };
