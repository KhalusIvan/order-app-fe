import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { getWorkspacesAction } from "../duck/workspaceDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";

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

export const createWorkspace =
  (
    json: { name: string },
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
    json: { name: string },
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/workspace/${id}/update`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      handleCloseDialog();
      dispatch(getWorkspaces(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
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
      await axios.delete(`api/workspace/${id}`, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      dispatch(getWorkspaces(params.toString()));
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("workspace"));
    }
  };
