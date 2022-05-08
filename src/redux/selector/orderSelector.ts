import { RootState } from "../store";

export const getOrdersSelector = (state: RootState) => {
  return state.orderReducer;
};

export const getOrderByIdSelector =
  (id: number | null) => (state: RootState) => {
    const finded = state.orderReducer.rows.find((el) => el.id === id);
    if (!id || !finded) return null;
    return {
      ...finded,
    };
  };

export const getOrderPaymentListSelector = (state: RootState) => {
  return state.orderReducer.paymentList || [];
};

export const getOrderStatusListSelector = (state: RootState) => {
  return state.orderReducer.statusList || [];
};

export const getOrderCustomerListSelector = (state: RootState) => {
  return state.orderReducer.customerList || [];
};

export const getOrderCurrencyListSelector = (state: RootState) => {
  return state.orderReducer.currencyList || [];
};

export const getOrderItemListSelector = (state: RootState) => {
  return state.orderReducer.itemList || [];
};
