import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import getAxiosInstance from "../../helpers/axios";
import { setBearerToken } from "../bearerToken";
import { getStatisticsAction } from "../duck/statisticDuck";
import { loaderAddAction, loaderRemoveAction } from "../duck/loaderDuck";

export const getStatistics =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(loaderAddAction("statistic"));
    const axios = getAxiosInstance(dispatch);
    try {
      const response = await axios.get(`api/order/statistic`, setBearerToken());
      dispatch(
        getStatisticsAction({
          ...response.data,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("statistic"));
    }
  };
