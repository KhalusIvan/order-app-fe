import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import {
  getOrdersAction,
  getOrderPaymentsAction,
  getOrderCustomersAction,
  getOrderStatusesAction,
  getOrderCurrenciesAction,
  getOrderItemsAction,
} from "../duck/orderDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";
import { Payment, Status } from "../../types";

export const getOrders =
  (params: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("order"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/order?${params}`, setBearerToken());
      if (params.includes("filter=true")) {
        dispatch(
          getOrdersAction({
            ...response.data,
            payment: response.data.payment.map(
              (el: { number: number; payment: Payment }) => ({
                id: el.payment.id,
                name: el.payment.name,
                number: el.number,
              })
            ),
            status: response.data.status.map(
              (el: { number: number; status: Status }) => ({
                id: el.status.id,
                name: el.status.name,
                number: el.number,
              })
            ),
          })
        );
      } else {
        dispatch(
          getOrdersAction({
            ...response.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("order"));
    }
  };

interface postRequest {
  firstName: string;
  lastName: string;
  middleName?: string;
  city: string;
  postOffice: string;
  telephone: string;
  statusId: number;
  paymentId: number;
  updateCustomer: boolean;
}

export const createOrder =
  (
    json: postRequest,
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/order/create`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getOrders(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const updateOrder =
  (
    id: number,
    json: postRequest,
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/order/${id}/update`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getOrders(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const finishOrder =
  (
    id: number,
    json: { order: { buyPrice: number; id: number }[] },
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/order/${id}/finish`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getOrders(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const deleteOrder =
  (
    id: number,
    params: URLSearchParams
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      dispatch(loaderAddAction("order"));
      await axios.delete(`api/order/${id}`, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      dispatch(getOrders(params.toString()));
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("order"));
    }
  };

export const getOrderStatuses =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("status"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/status`, setBearerToken());
      dispatch(
        getOrderStatusesAction({
          ...response.data,
          statusList: response.data,
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("status"));
    }
  };

export const getOrderPayments =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("payment"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/payment`, setBearerToken());
      dispatch(
        getOrderPaymentsAction({
          ...response.data,
          paymentList: response.data,
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("payment"));
    }
  };

export const getOrderCustomers =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("customer"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/customer`, setBearerToken());
      dispatch(
        getOrderCustomersAction({
          ...response.data,
          customerList: response.data,
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("customer"));
    }
  };

export const getOrderCurrencies =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("currency"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/currency`, setBearerToken());
      dispatch(
        getOrderCurrenciesAction({
          ...response.data,
          currencyList: response.data.map(
            (
              el: { id: number; name: string; code: string; cost: number },
              index: number
            ) => ({
              ...el,
              cost: el.cost.toFixed(2),
              index,
            })
          ),
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("currency"));
    }
  };

export const getOrderItems =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("item"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/item`, setBearerToken());
      dispatch(
        getOrderItemsAction({
          ...response.data,
          itemList: response.data,
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("item"));
    }
  };
