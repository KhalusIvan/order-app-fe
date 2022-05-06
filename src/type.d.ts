type DispatchType = (args: ArticleAction) => ArticleAction;

type CustomAction = {
  type: string;
  payload:
    | Alert
    | User
    | ManufacturerState
    | EmployeeState
    | ItemState
    | CustomerState
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

interface EmployeeState {
  count?: number;
  pages?: number;
  rows: Employee[];
  role?: { id: number; name: string; number: number }[];
  roleList?: { id: number; name: string }[];
  userList?: { id: number; name: string; email: string }[];
}
interface ItemState {
  count?: number;
  pages?: number;
  rows: Item[];
  manufacturer?: { id: number; name: string; number: number }[];
  manufacturerList?: { id: number; name: string }[];
}

interface CustomerState {
  count?: number;
  pages?: number;
  rows: Customer[];
}

interface WorkspaceState {
  count?: number;
  pages?: number;
  rows: WorkspaceRequest[];
}
