import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { addArticleAction } from "../duck/firstDuck";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const addArcticle =
  (text: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    try {
      await sleep(1000);
      dispatch(addArticleAction({ id: 1, title: "dd", body: "ff" }));
    } catch (err) {
      console.log(err);
    }
  };
