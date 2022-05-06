import { RootState } from "../store";

export const getEmployeesSelector = (state: RootState) => {
  return state.employeeReducer;
};

export const getEmployeeByIdSelector =
  (id: number | null) => (state: RootState) => {
    const finded = state.employeeReducer.rows.find((el) => el.id === id);
    if (!id || !finded) return null;
    return {
      ...finded,
      user: {
        id: finded.user.id,
        name: `${finded.user.firstName} ${finded.user.lastName}`,
        email: finded.user.email,
      },
    };
  };

export const getEmployeeRoleListSelector = (state: RootState) => {
  return state.employeeReducer.roleList || [];
};

export const getEmployeeUserListSelector = (state: RootState) => {
  return state.employeeReducer.userList || [];
};
