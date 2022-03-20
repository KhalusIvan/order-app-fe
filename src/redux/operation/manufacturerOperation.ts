import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { getManufacturersAction } from "../duck/manufacturerDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";
import { Currency } from "../../types";

export const getManufacturers =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("manufacturer"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(
        "api/manufacturer?filter=true&page=1",
        setBearerToken()
      );
      dispatch(
        getManufacturersAction({
          ...response.data,
          currency: response.data.currency.map(
            (el: { number: number; currency: Currency }) => ({
              id: el.currency.id,
              name: `${el.currency.name} (${el.currency.code})`,
              number: el.number,
            })
          ),
        })
      );
    } catch (err) {
    } finally {
      dispatch(loaderRemoveAction("manufacturer"));
    }
  };
