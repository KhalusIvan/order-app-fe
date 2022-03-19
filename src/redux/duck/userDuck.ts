import { User } from "../../types/UserTypes";

enum actions {
  SIGN_IN = "SIGN_IN",
}

const initialState: User | null = null;

export function signInAction(user: User) {
  const action: CustomAction = {
    type: actions.SIGN_IN,
    payload: user,
  };
  return action;
}

const userReducer = (
  state: User | null = initialState,
  action: CustomAction
): User | null => {
  switch (action.type) {
    case actions.SIGN_IN:
      return action.payload;
  }
  return state;
};

export default userReducer;
