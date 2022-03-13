import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { RouteComponentProps } from "react-router-dom";
import { UserRegister, UserSignIn } from "../../types";

export const checkUser =
  (
    history: RouteComponentProps["history"]
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      console.log("here");
      const response = await axios.get("api/check", setBearerToken());
      if (
        history.location.pathname.includes("/auth/") ||
        history.location.pathname === "/"
      ) {
        history.push("/dashboard");
      }
    } catch (err) {}
  };

export const register =
  (user: UserRegister): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.post(
        "api/auth/register",
        user,
        setBearerToken()
      );
    } catch (err) {}
  };

export const signIn =
  (
    user: UserSignIn,
    setSubmitting: (arg0: boolean) => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.post(
        "api/auth/sign-in",
        user,
        setBearerToken()
      );
      console.log(response);
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };
