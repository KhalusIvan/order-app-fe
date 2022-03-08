import { Alert } from "../../types";

enum actions {
  ALERT_ADD = "ALERT_ADD",
  ALERT_REMOVE = "ALERT_REMOVE",
}

const initialState: Alert[] = [];

export function addAlertAction(alert: Alert) {
  const action: AlertAction = {
    type: actions.ALERT_ADD,
    payload: alert,
  };
  return action;
}

export function removeAlertAction(alert: Alert) {
  const action: AlertAction = {
    type: actions.ALERT_REMOVE,
    payload: alert,
  };
  return action;
}

const alertReducer = (
  state: Alert[] = initialState,
  action: AlertAction
): Alert[] => {
  switch (action.type) {
    case actions.ALERT_ADD:
      return [action.payload, ...state];
    case actions.ALERT_REMOVE:
      const newAlerts: Alert[] = state.filter(
        (alert) => alert.id !== action.payload.id
      );
      return newAlerts;
  }
  return state;
};

export default alertReducer;
