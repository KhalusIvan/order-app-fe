import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { addAlertAction, removeAlertAction } from "../duck/alertDuck";
import { Alert } from "../../types";

export const setAlert =
  (alert: Alert): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    setTimeout(() => {
      dispatch(removeAlertAction(alert));
    }, 4000);
    dispatch(addAlertAction(alert));
  };
