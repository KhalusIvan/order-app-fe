type DispatchType = (args: ArticleAction) => ArticleAction;

type CustomAction = {
  type: string;
  payload:
    | Alert
    | User
    | ManufacturerState
    | WorkspaceState
    | string
    | { id: number; name: string }[];
};

interface ManufacturerState {
  count?: number;
  pages?: number;
  rows: Manufacturer[];
  currency?: { id: number; name: string; number: number }[];
  currencyList?: { id: number; name: string }[];
}

interface WorkspaceState {
  count?: number;
  pages?: number;
  rows: WorkspaceRequest[];
}
