import { RootState } from "../store";

export const getLoaderSelector = (field: string) => (state: RootState) => {
  return !!state.loaderReducer[field];
};
