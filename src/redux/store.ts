import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

import alertReducer from "./duck/alertDuck";

const rootReducer = combineReducers({ alertReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const store: Store<RootState, AlertAction> & {
  dispatch: DispatchType;
} = createStore(rootReducer, applyMiddleware(thunk));
