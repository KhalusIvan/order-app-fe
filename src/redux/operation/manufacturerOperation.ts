import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import {
  getManufacturersAction,
  getManufacturerCurrenciesAction,
} from "../duck/manufacturerDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";
import { Currency } from "../../types";

export const getManufacturers =
  (params: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("manufacturer"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(
        `api/manufacturer?${params}`,
        setBearerToken()
      );
      if (params.includes("filter=true")) {
        dispatch(
          getManufacturersAction({
            ...response.data,
            currency: response.data.currency.map(
              (el: { number: number; currency: Currency }) => ({
                id: el.currency.id,
                name: `${el.currency.name} (${el.currency.code})`,
                number: el.number,
              })
            ),
          })
        );
      } else {
        dispatch(
          getManufacturersAction({
            ...response.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("manufacturer"));
    }
  };

export const createManufacturer =
  (
    json: { name: string; currencyId: number },
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/manufacturer/create`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getManufacturers(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const updateManufacturer =
  (
    id: number,
    json: { name: string; currencyId: number },
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/manufacturer/${id}/update`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getManufacturers(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const deleteManufacturer =
  (
    id: number,
    params: URLSearchParams
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      dispatch(loaderAddAction("manufacturer"));
      await axios.delete(`api/manufacturer/${id}`, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      dispatch(getManufacturers(params.toString()));
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("manufacturer"));
    }
  };

export const getManufacturerCurrencies =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("currency"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/currency`, setBearerToken());
      dispatch(
        getManufacturerCurrenciesAction({
          ...response.data,
          currencyList: response.data.map(
            (el: { id: number; name: string; code: number }) => ({
              id: el.id,
              name: `${el.name} (${el.code})`,
            })
          ),
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("currency"));
    }
  };
