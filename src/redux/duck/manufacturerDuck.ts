enum actions {
  MANUFACTURER_GET_ALL = "MANUFACTURER_GET_ALL",
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

const manufacturerReducer = (
  state: ManufacturerState = initialState,
  action: CustomAction
): ManufacturerState => {
  switch (action.type) {
    case actions.MANUFACTURER_GET_ALL:
      return { ...state, ...action.payload };
  }
  return state;
};

export default manufacturerReducer;
