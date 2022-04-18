import { User } from "../../types/UserTypes";

interface UserState {
  user: User | null;
  checked: boolean;
}

enum actions {
  SIGN_IN = "SIGN_IN",
  CHECKED = "CHECKED",
}

const initialState: UserState | null = {
  user: null,
  checked: false,
};

export function signInAction(user: User) {
  const action: CustomAction = {
    type: actions.SIGN_IN,
    payload: user,
  };
  return action;
}

export function checkedAction() {
  const action: CustomAction = {
    type: actions.CHECKED,
    payload: true,
  };
  return action;
}

const userReducer = (
  state: UserState = initialState,
  action: CustomAction
): UserState => {
  switch (action.type) {
    case actions.SIGN_IN:
      return { ...state, user: action.payload };
    case actions.CHECKED:
      return { ...state, checked: action.payload };
  }
  return state;
};

export default userReducer;
