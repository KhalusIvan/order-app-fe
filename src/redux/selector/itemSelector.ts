import { RootState } from "../store";

export const getItemsSelector = (state: RootState) => {
  return state.itemReducer;
};

export const getItemByIdSelector =
  (id: number | null) => (state: RootState) => {
    const finded = state.itemReducer.rows.find((el) => el.id === id);
    if (!id || !finded) return null;
    return {
      ...finded,
    };
  };

export const getItemManufacturerListSelector = (state: RootState) => {
  return state.itemReducer.manufacturerList || [];
};
