import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { addArticleAction } from "../duck/firstDuck";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { RouteComponentProps } from "react-router-dom";

const axios = getAxiosInstance();

export const addArcticle =
  (text: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    try {
      dispatch(addArticleAction({ id: 1, title: "dd", body: "ff" }));
    } catch (err) {
      console.log(err);
    }
  };

export const checkUser =
  (
    history: RouteComponentProps["history"]
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    try {
      const response = await axios.get("api/check", setBearerToken());
      if (
        history.location.pathname.includes("/auth/") ||
        history.location.pathname === "/"
      ) {
        history.push("/dashboard");
      }
      //dispatch(addArticleAction({ id: 1, title: "dd", body: "ff" }));
    } catch (err) {
      if (
        !history.location.pathname.includes("/auth/") ||
        history.location.pathname === "/"
      ) {
        history.push("/auth/sign-in");
      }
      //console.log(err);
    }
  };
