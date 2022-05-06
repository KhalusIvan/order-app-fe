enum actions {
  EMPLOYEE_GET_ALL = "EMPLOYEE_GET_ALL",
}

const initialState: EmployeeState = {
  rows: [],
};

export function getEmployeesAction(employee: EmployeeState) {
  const action: CustomAction = {
    type: actions.EMPLOYEE_GET_ALL,
    payload: employee,
  };
  return action;
}

export function getEmployeeRolesAction(
  roleList: { id: number; name: string }[]
) {
  const action: CustomAction = {
    type: actions.EMPLOYEE_GET_ALL,
    payload: roleList,
  };
  return action;
}

export function getEmployeeUsersAction(
  userList: { id: number; name: string; email: string }[]
) {
  const action: CustomAction = {
    type: actions.EMPLOYEE_GET_ALL,
    payload: userList,
  };
  return action;
}
const employeeReducer = (
  state: EmployeeState = initialState,
  action: CustomAction
): EmployeeState => {
  switch (action.type) {
    case actions.EMPLOYEE_GET_ALL:
      return { ...state, ...action.payload };
  }
  return state;
};

export default employeeReducer;
