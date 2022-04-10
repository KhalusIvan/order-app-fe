enum actions {
  WORKSPACE_GET_ALL = "WORKSPACE_GET_ALL",
}

const initialState: WorkspaceState = {
  rows: [],
};

export function getWorkspacesAction(workspace: WorkspaceState) {
  const action: CustomAction = {
    type: actions.WORKSPACE_GET_ALL,
    payload: workspace,
  };
  return action;
}

const workspaceReducer = (
  state: WorkspaceState = initialState,
  action: CustomAction
): WorkspaceState => {
  switch (action.type) {
    case actions.WORKSPACE_GET_ALL:
      return { ...state, ...action.payload };
  }
  return state;
};

export default workspaceReducer;
