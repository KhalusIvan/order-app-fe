import { Loader } from "../../types";

enum actions {
  LOADER_ADD = "LOADER_ADD",
  LOADER_REMOVE = "LOADER_REMOVE",
}

const initialState: Loader = { check: 0, manufacturer: 0 };

export function loaderAddAction(field: string) {
  const action: CustomAction = {
    type: actions.LOADER_ADD,
    payload: field,
  };
  return action;
}

export function loaderRemoveAction(field: string) {
  const action: CustomAction = {
    type: actions.LOADER_REMOVE,
    payload: field,
  };
  return action;
}

const loaderReducer = (
  state: Loader = initialState,
  action: CustomAction
): Loader => {
  switch (action.type) {
    case actions.LOADER_ADD:
      return { ...state, [action.payload]: state[action.payload] + 1 };
    case actions.LOADER_REMOVE:
      return { ...state, [action.payload]: state[action.payload] - 1 };
  }
  return state;
};

export default loaderReducer;
