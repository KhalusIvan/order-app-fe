enum actions {
  ITEM_GET_ALL = "ITEM_GET_ALL",
}

const initialState: ItemState = {
  rows: [],
};

export function getItemsAction(item: ItemState) {
  const action: CustomAction = {
    type: actions.ITEM_GET_ALL,
    payload: item,
  };
  return action;
}

export function getItemManufacturersAction(
  manufacturerList: { id: number; name: string }[]
) {
  const action: CustomAction = {
    type: actions.ITEM_GET_ALL,
    payload: manufacturerList,
  };
  return action;
}
const itemReducer = (
  state: ItemState = initialState,
  action: CustomAction
): ItemState => {
  switch (action.type) {
    case actions.ITEM_GET_ALL:
      return { ...state, ...action.payload };
  }
  return state;
};

export default itemReducer;
