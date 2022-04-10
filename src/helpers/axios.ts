import axios from "axios";
import { AnyAction, CombinedState } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setAlert } from "../redux/operation/alertOperation";
import { RootState } from "../redux/store";
import { Alert } from "../types";

const baseURL = process.env.REACT_APP_API_URL;

const getAxiosInstance = (
  dispatch: ThunkDispatch<CombinedState<RootState>, null, AnyAction>
) => {
  const instance = axios.create({
    baseURL,
    responseType: "json",
  });

  instance.interceptors.response.use(
    (response) => {
      if (response?.data.severity && response?.data.text) {
        const alert: Alert = {
          id: Date.now(),
          severity: response?.data.severity,
          text: response?.data.text,
        };
        dispatch(setAlert(alert));
      }
      return response;
    },
    (err) => {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        if (
          !window.location.pathname.includes("/auth/") &&
          window.location.pathname !== "/"
        ) {
          //window.location.replace(`/auth/sign-in`);
        }
      } else if (err?.response?.data.severity && err?.response?.data.text) {
        const alert: Alert = {
          id: Date.now(),
          severity: err?.response?.data.severity,
          text: err?.response?.data.text,
        };
        dispatch(setAlert(alert));
      } else {
        const alert: Alert = {
          id: Date.now(),
          severity: "error",
          text: "Проблеми сервера! Спробуйте пізніше",
        };
        dispatch(setAlert(alert));
      }
      throw err;
    }
  );
  return instance;
};

export default getAxiosInstance;
