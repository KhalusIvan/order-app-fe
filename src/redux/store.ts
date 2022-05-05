import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

import alertReducer from "./duck/alertDuck";
import userReducer from "./duck/userDuck";
import loaderReducer from "./duck/loaderDuck";
import manufacturerReducer from "./duck/manufacturerDuck";
import itemReducer from "./duck/itemDuck";
import customerReducer from "./duck/customerDuck";
import workspaceReducer from "./duck/workspaceDuck";

const rootReducer = combineReducers({
  alertReducer,
  userReducer,
  loaderReducer,
  manufacturerReducer,
  itemReducer,
  customerReducer,
  workspaceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store: Store<RootState, CustomAction> & {
  dispatch: DispatchType;
} = createStore(rootReducer, applyMiddleware(thunk));
