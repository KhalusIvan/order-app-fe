import { Payment } from "./Payment";
import { User } from "./UserTypes";
import { Status } from "./Status";
import { Item } from "./Item";

export type Order = {
  id: number;
  postCode: string;
  status: Status;
  user: User;
  firstName: string;
  lastName: string;
  middleName?: string;
  city: string;
  postOffice: number;
  telephone: string;
  createdAt: string;
  payment: Payment;
  items: {
    id: number;
    amount: number;
    sellPrice: number;
    buyPrice: number;
    item: Item;
  }[];
};
