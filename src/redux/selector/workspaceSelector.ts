import { WorkspaceRequest } from "../../types/WorkspaceRequest";
import { RootState } from "../store";

export const getWorkspacesSelector = (state: RootState) => {
  return state.workspaceReducer;
};

export const getWorkspaceByIdSelector =
  (id: number | null) => (state: RootState) => {
    if (!id) return null;
    const finded = state.workspaceReducer.rows.find(
      (el: WorkspaceRequest) => el.id === id
    );
    if (!id || !finded) return null;
    return finded;
  };
