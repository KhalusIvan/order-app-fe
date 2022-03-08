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
    }, 6000);
    dispatch(addAlertAction(alert));
  };

/*import { setAlertErrorAction } from "../action/alertErrorsAction";

export const setAlertError = (alertError) => async (dispatch, getState) => {
  if (alertError.in === true) {
    setTimeout(() => {
      dispatch(
        setAlertErrorAction({
          in: false,
          severity: alertError.severity,
          text: alertError.text,
        })
      );
    }, 6000);
  }
  dispatch(setAlertErrorAction(alertError));
};*/
