import { Customer } from "../../types";

enum actions {
  ORDER_GET_ALL = "ORDER_GET_ALL",
}

const initialState: OrderState = {
  rows: [],
};

export function getOrdersAction(order: OrderState) {
  const action: CustomAction = {
    type: actions.ORDER_GET_ALL,
    payload: order,
  };
  return action;
}

export function getOrderStatusesAction(
  statusList: { id: number; name: string }[]
) {
  const action: CustomAction = {
    type: actions.ORDER_GET_ALL,
    payload: statusList,
  };
  return action;
}

export function getOrderPaymentsAction(
  paymentList: { id: number; name: string }[]
) {
  const action: CustomAction = {
    type: actions.ORDER_GET_ALL,
    payload: paymentList,
  };
  return action;
}

export function getOrderCustomersAction(customerList: Customer[]) {
  const action: CustomAction = {
    type: actions.ORDER_GET_ALL,
    payload: customerList,
  };
  return action;
}

export function getOrderCurrenciesAction(currencyList: Customer[]) {
  const action: CustomAction = {
    type: actions.ORDER_GET_ALL,
    payload: currencyList,
  };
  return action;
}

export function getOrderItemsAction(itemList: Customer[]) {
  const action: CustomAction = {
    type: actions.ORDER_GET_ALL,
    payload: itemList,
  };
  return action;
}

const orderReducer = (
  state: OrderState = initialState,
  action: CustomAction
): OrderState => {
  switch (action.type) {
    case actions.ORDER_GET_ALL:
      return { ...state, ...action.payload };
  }
  return state;
};

export default orderReducer;
