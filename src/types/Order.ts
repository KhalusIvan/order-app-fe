import { Customer } from "./Customer";
import { Payment } from "./Payment";
import { User } from "./UserTypes";
import { Status } from "./Status";

export type Order = {
  id: number;
  postCode: string;
  status: Status;
  user: User;
  customer: Customer;
  payment: Payment;
};
