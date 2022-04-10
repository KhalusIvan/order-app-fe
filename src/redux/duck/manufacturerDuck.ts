enum actions {
  MANUFACTURER_GET_ALL = "MANUFACTURER_GET_ALL",
  MANUFACTURER_CURRENCY_LIST = "MANUFACTURER_CURRENCY_LIST",
}

const initialState: ManufacturerState = {
  rows: [],
};

export function getManufacturersAction(manufacturer: ManufacturerState) {
  const action: CustomAction = {
    type: actions.MANUFACTURER_GET_ALL,
    payload: manufacturer,
  };
  return action;
}

export function getManufacturerCurrenciesAction(
  currencyList: { id: number; name: string }[]
) {
  const action: CustomAction = {
    type: actions.MANUFACTURER_GET_ALL,
    payload: currencyList,
  };
  return action;
}
const manufacturerReducer = (
  state: ManufacturerState = initialState,
  action: CustomAction
): ManufacturerState => {
  switch (action.type) {
    case actions.MANUFACTURER_GET_ALL:
      return { ...state, ...action.payload };
    case actions.MANUFACTURER_CURRENCY_LIST:
      return { ...state, ...action.payload };
  }
  return state;
};

export default manufacturerReducer;
