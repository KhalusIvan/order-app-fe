import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { getItemsAction, getItemManufacturersAction } from "../duck/itemDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";
import { Manufacturer } from "../../types";

export const getItems =
  (params: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("item"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/item?${params}`, setBearerToken());
      if (params.includes("filter=true")) {
        dispatch(
          getItemsAction({
            ...response.data,
            manufacturer: response.data.manufacturer.map(
              (el: { number: number; manufacturer: Manufacturer }) => ({
                id: el.manufacturer.id,
                name: el.manufacturer.name,
                number: el.number,
              })
            ),
          })
        );
      } else {
        dispatch(
          getItemsAction({
            ...response.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("item"));
    }
  };

export const createItem =
  (
    json: {
      name: string;
      code: string;
      manufacturerId: number;
      buyPrice: number;
      recomendedSellPrice: number;
    },
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/item/create`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getItems(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const updateItem =
  (
    id: number,
    json: {
      name: string;
      code: string;
      manufacturerId: number;
      buyPrice: number;
      recomendedSellPrice: number;
    },
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/item/${id}/update`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getItems(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const deleteItem =
  (
    id: number,
    params: URLSearchParams
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      dispatch(loaderAddAction("item"));
      await axios.delete(`api/item/${id}`, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      dispatch(getItems(params.toString()));
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("item"));
    }
  };

export const getItemManufacturers =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("manufacturer"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/manufacturer`, setBearerToken());
      dispatch(
        getItemManufacturersAction({
          ...response.data,
          manufacturerList: response.data.map(
            (el: { id: number; name: string }) => ({
              id: el.id,
              name: el.name,
            })
          ),
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("manufacturer"));
    }
  };
