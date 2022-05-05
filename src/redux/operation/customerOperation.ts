import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { getCustomersAction } from "../duck/customerDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";
import { Customer } from "../../types";

export const getCustomers =
  (params: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("customer"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(
        `api/customer?${params}`,
        setBearerToken()
      );
      if (params.includes("filter=true")) {
        dispatch(
          getCustomersAction({
            ...response.data,
            /*manufacturer: response.data.manufacturer.map(
              (el: { number: number; manufacturer: Manufacturer }) => ({
                id: el.manufacturer.id,
                name: el.manufacturer.name,
                number: el.number,
              })
            ),*/
          })
        );
      } else {
        dispatch(
          getCustomersAction({
            ...response.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("customer"));
    }
  };

export const createCustomer =
  (
    json: Customer,
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/customer/create`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getCustomers(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const updateCustomer =
  (
    id: number,
    json: Customer,
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/customer/${id}/update`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getCustomers(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const deleteCustomer =
  (
    id: number,
    params: URLSearchParams
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      dispatch(loaderAddAction("customer"));
      await axios.delete(`api/customer/${id}`, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      dispatch(getCustomers(params.toString()));
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("customer"));
    }
  };
