import { Currency } from "./Currency";

export type Manufacturer = {
  id: number;
  name: string;
  percent: number;
  currency: Currency;
  currencyId?: number;
};
