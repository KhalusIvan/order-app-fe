enum actions {
  STATISTIC_GET_ALL = "STATISTIC_GET_ALL",
}

const initialState: StatisticState = {
  general: [],
  items: [],
  saler: [],
};

export function getStatisticsAction(statistic: StatisticState) {
  const action: CustomAction = {
    type: actions.STATISTIC_GET_ALL,
    payload: statistic,
  };
  return action;
}

const statisticReducer = (
  state: StatisticState = initialState,
  action: CustomAction
): StatisticState => {
  switch (action.type) {
    case actions.STATISTIC_GET_ALL:
      return { ...state, ...action.payload };
  }
  return state;
};

export default statisticReducer;
