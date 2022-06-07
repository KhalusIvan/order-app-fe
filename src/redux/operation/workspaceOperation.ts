import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { getWorkspacesAction } from "../duck/workspaceDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";
import { signInAction } from "../duck/userDuck";

export const getWorkspaces =
  (params: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("workspace"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(
        `api/workspace?${params}`,
        setBearerToken()
      );

      dispatch(
        getWorkspacesAction({
          ...response.data,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("workspace"));
    }
  };

interface postRequest {
  name: string;
}

export const createWorkspace =
  (
    json: postRequest,
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/workspace/create`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      handleCloseDialog();
      dispatch(getWorkspaces(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const updateWorkspace =
  (
    id: number,
    json: postRequest,
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.post(
        `api/workspace/${id}/update`,
        json,
        setBearerToken()
      );
      if (!params.has("page")) {
        params.append("page", "1");
      }
      handleCloseDialog();
      dispatch(getWorkspaces(params.toString()));
      response.data.user && dispatch(signInAction(response.data.user));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const setCurrentWorkspace =
  (json: {
    workspaceId: number;
  }): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.post(
        `api/user/current-workspace`,
        json,
        setBearerToken()
      );
      dispatch(signInAction(response.data.user));
    } catch (err) {}
  };

export const deleteWorkspace =
  (
    id: number,
    params: URLSearchParams
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      dispatch(loaderAddAction("workspace"));
      const response = await axios.delete(
        `api/workspace/${id}`,
        setBearerToken()
      );
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      dispatch(getWorkspaces(params.toString()));
      dispatch(signInAction(response.data.user));
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("workspace"));
    }
  };
