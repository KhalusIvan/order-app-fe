import OrderIcon from "../static/icons/order.png";
import Monitor from "../static/icons/monitor.png";
import Buyer from "../static/icons/buyer.png";
import Factory from "../static/icons/factory.png";
import Boxes from "../static/icons/boxes.png";
import EmployeeImage from "../static/icons/employee.png";
import Coworking from "../static/icons/coworking.png";

import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { ConfirmAccount } from "../pages/auth/ConfirmAccount";
import { ConfirmPassword } from "../pages/auth/ConfirmPassword";

import { Manufacturer } from "../pages/Manufacturer/Manufacturer";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Employee } from "../pages/Employee/Employee";
import { Item } from "../pages/Item/Item";
import { Order } from "../pages/Order/Order";
import { Customer } from "../pages/Customer/Customer";
import { Workspace } from "../pages/Workspace/Workspace";
import { Home } from "../pages/Home";

import { Route } from "../types/Route";
const prices = [
  1200, 1350, 800, 1200, 5000, 12000, 8500, 4560, 4560, 12000, 12300, 1200,
  15000, 12800,
];
const routes: Array<Route> = [
  //First page
  {
    title: "Welcome",
    component: Home,
    path: "/",
    icon: OrderIcon,
    sidebar: false,
    authentificated: false,
  },
  //Auth
  {
    title: "Sign in",
    component: SignIn,
    path: "/auth/sign-in",
    sidebar: false,
    authentificated: false,
  },
  {
    title: "Sign up",
    component: SignUp,
    path: "/auth/sign-up",
    sidebar: false,
    authentificated: false,
  },
  {
    title: "Reset password",
    component: ResetPassword,
    path: "/auth/reset-password",
    sidebar: false,
    authentificated: false,
  },
  {
    title: "Confirm account",
    component: ConfirmAccount,
    path: "/auth/confirmation/:token",
    sidebar: false,
    authentificated: false,
  },
  {
    title: "Confirm account",
    component: ConfirmAccount,
    path: "/auth/confirmation/:token",
    sidebar: false,
    authentificated: false,
  },
  {
    title: "Confirm password",
    component: ConfirmPassword,
    path: "/auth/confirmation_password/:token",
    sidebar: false,
    authentificated: false,
  },
  //Dashboard
  {
    title: "Панель",
    component: Dashboard,
    path: "/dashboard",
    icon: Monitor,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Замовлення",
    component: Order,
    path: "/order",
    icon: OrderIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Покупці",
    component: Customer,
    path: "/customer",
    icon: Buyer,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Виробники",
    component: Manufacturer,
    path: "/manufacturer",
    icon: Factory,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Продукція",
    component: Item,
    path: "/item",
    icon: Boxes,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Штат",
    component: Employee,
    path: "/employee",
    icon: EmployeeImage,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Простір",
    component: Workspace,
    path: "/workspace",
    icon: Coworking,
    sidebar: true,
    authentificated: true,
  },
];

export default routes;
