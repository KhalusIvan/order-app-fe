import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

import reducer from "./duck/firstDuck";

const rootReducer = combineReducers({ reducer });

export type RootState = ReturnType<typeof rootReducer>;

export const store: Store<RootState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(rootReducer, applyMiddleware(thunk));
