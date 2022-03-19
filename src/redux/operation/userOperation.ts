import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { RouteComponentProps } from "react-router-dom";
import { UserRegister, UserSignIn } from "../../types/UserTypes";
import { signInAction } from "../duck/userDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";

export const checkUser =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("check"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get("api/user/check", setBearerToken());
      dispatch(signInAction(response.data.user));
      if (
        window.location.pathname.includes("/auth/") ||
        window.location.pathname === "/"
      ) {
        window.location.replace("/dashboard");
      }
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("check"));
    }
  };

export const register =
  (
    user: UserRegister,
    setSubmitting: (arg0: boolean) => void,
    history: RouteComponentProps["history"]
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post("api/auth/register", user, setBearerToken());
      history.push("/auth/sign-in");
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

export const signIn =
  (
    user: UserSignIn,
    setSubmitting: (arg0: boolean) => void,
    history: RouteComponentProps["history"]
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.post(
        "api/auth/sign-in",
        user,
        setBearerToken()
      );
      localStorage.setItem("token", response.data.token);
      dispatch(signInAction(response.data.user));
      history.push("/dashboard");
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

export const resetPassword =
  (
    email: { email: string },
    setSubmitting: (arg0: boolean) => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post("api/auth/reset-password", email, setBearerToken());
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

export const confirmAccount =
  (
    token: string,
    history: RouteComponentProps["history"]
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(
        "api/user/confirmation",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
    } finally {
      history.push("/auth/sign-in");
    }
  };

export const confirmPassword =
  (
    token: string,
    history: RouteComponentProps["history"]
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(
        "api/user/confirm-password",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
    } finally {
      history.push("/auth/sign-in");
    }
  };
