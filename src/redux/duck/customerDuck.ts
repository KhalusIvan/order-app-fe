enum actions {
  CUSTOMER_GET_ALL = "CUSTOMER_GET_ALL",
}

const initialState: CustomerState = {
  rows: [],
};

export function getCustomersAction(customer: CustomerState) {
  const action: CustomAction = {
    type: actions.CUSTOMER_GET_ALL,
    payload: customer,
  };
  return action;
}

const customerReducer = (
  state: CustomerState = initialState,
  action: CustomAction
): CustomerState => {
  switch (action.type) {
    case actions.CUSTOMER_GET_ALL:
      return { ...state, ...action.payload };
  }
  return state;
};

export default customerReducer;
