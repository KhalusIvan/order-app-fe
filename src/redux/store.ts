import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

import alertReducer from "./duck/alertDuck";
import userReducer from "./duck/userDuck";
import loaderReducer from "./duck/loaderDuck";
import manufacturerReducer from "./duck/manufacturerDuck";
import employeeReducer from "./duck/employeeDuck";
import itemReducer from "./duck/itemDuck";
import orderReducer from "./duck/orderDuck";
import customerReducer from "./duck/customerDuck";
import workspaceReducer from "./duck/workspaceDuck";

const rootReducer = combineReducers({
  alertReducer,
  userReducer,
  loaderReducer,
  manufacturerReducer,
  employeeReducer,
  itemReducer,
  orderReducer,
  customerReducer,
  workspaceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store: Store<RootState, CustomAction> & {
  dispatch: DispatchType;
} = createStore(rootReducer, applyMiddleware(thunk));
