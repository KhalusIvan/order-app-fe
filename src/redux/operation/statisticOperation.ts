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

      const itemsSort = response.data.items.sort(
        (
          a: { number: number; item: { id: number; code: string } },
          b: { number: number; item: { id: number; code: string } }
        ) => (+a.number < +b.number ? 1 : +a.number > +b.number ? -1 : 0)
      );
      const otherItems = itemsSort.splice(4, itemsSort.length - 4);
      const otherItemNumber = otherItems.reduce(
        (prev: { number: number }, curr: { number: number }) => ({
          number: +prev.number + +curr.number,
        }),
        { number: 0 }
      ).number;

      const salerSort = response.data.saler.sort(
        (a: { sell: number }, b: { sell: number }) =>
          +a.sell < +b.sell ? 1 : +a.sell > +b.sell ? -1 : 0
      );
      const otherSaler = salerSort.splice(4, salerSort.length - 4);
      const otherSalerSell = otherSaler.reduce(
        (prev: { sell: number }, curr: { sell: number }) => ({
          sell: +prev.sell + +curr.sell,
        }),
        { sell: 0 }
      ).sell;

      const items =
        otherItemNumber === 0
          ? itemsSort
          : [
              ...itemsSort,
              { number: otherItemNumber, item: { id: 0, code: "Інше" } },
            ];
      const saler =
        otherSalerSell === 0
          ? salerSort
          : [
              ...salerSort,
              {
                number: otherSalerSell,
                user: { id: 0, firstName: "Інше", lastName: "" },
              },
            ];

      dispatch(
        getStatisticsAction({
          general: response.data.general,
          items,
          saler,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderRemoveAction("statistic"));
    }
  };
