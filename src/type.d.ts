type DispatchType = (args: ArticleAction) => ArticleAction;

type CustomAction = {
  type: string;
  payload:
    | Alert
    | User
    | ManufacturerState
    | EmployeeState
    | ItemState
    | OrderState
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

interface OrderState {
  count?: number;
  pages?: number;
  rows: Item[];
  payment?: { id: number; name: string; number: number }[];
  status?: { id: number; name: string; number: number }[];
  paymentList?: { id: number; name: string }[];
  statusList?: { id: number; name: string }[];
  customerList?: Customer[];
  currencyList?: Currency[];
  itemList?: Item[];
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
