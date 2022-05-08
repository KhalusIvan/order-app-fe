import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import {
  getEmployeesAction,
  getEmployeeRolesAction,
  getEmployeeUsersAction,
} from "../duck/employeeDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";
import { Role } from "../../types";

export const getEmployees =
  (params: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("employee"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(
        `api/employee?${params}`,
        setBearerToken()
      );
      if (params.includes("filter=true")) {
        dispatch(
          getEmployeesAction({
            ...response.data,
            role: response.data.role.map(
              (el: { number: number; role: Role }) => ({
                id: el.role.id,
                name: el.role.name,
                number: el.number,
              })
            ),
          })
        );
      } else {
        dispatch(
          getEmployeesAction({
            ...response.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("employee"));
    }
  };

interface postRequest {
  userId: number;
  roleId: number;
}

export const createEmployee =
  (
    json: postRequest,
    params: URLSearchParams,
    setSubmitting: (arg0: boolean) => void,
    handleCloseDialog: () => void
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      await axios.post(`api/employee/create`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getEmployees(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const updateEmployee =
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
      await axios.post(`api/employee/${id}/update`, json, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      handleCloseDialog();
      dispatch(getEmployees(params.toString()));
    } catch (err) {
      setSubmitting(false);
    }
  };

export const deleteEmployee =
  (
    id: number,
    params: URLSearchParams
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    const axios = getAxiosInstance(dispatch);
    try {
      dispatch(loaderAddAction("employee"));
      await axios.delete(`api/employee/${id}`, setBearerToken());
      if (!params.has("page")) {
        params.append("page", "1");
      }
      params.append("filter", "true");
      dispatch(getEmployees(params.toString()));
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("employee"));
    }
  };

export const getEmployeeRoles =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("role"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/role`, setBearerToken());
      dispatch(
        getEmployeeRolesAction({
          ...response.data,
          roleList: response.data,
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("role"));
    }
  };

export const getEmployeeUsers =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("user"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/user`, setBearerToken());
      dispatch(
        getEmployeeUsersAction({
          ...response.data,
          userList: response.data.map(
            (el: {
              id: number;
              firstName: string;
              lastName: string;
              email: string;
            }) => {
              return {
                id: el.id,
                name: `${el.firstName} ${el.lastName}`,
                email: el.email,
              };
            }
          ),
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("user"));
    }
  };
