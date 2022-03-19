type DispatchType = (args: ArticleAction) => ArticleAction;

type CustomAction = {
  type: string;
  payload: Alert | User | ManufacturerState | string;
};

interface ManufacturerState {
  count?: number;
  pages?: number;
  rows: Manufacturer[];
  currency?: { number: number; currency: Currency }[];
}
