import {
  Home as HomeIcon,
  BarChartOutlined as DashboardIcon,
  CodeOutlined as CodeIcon,
  GitHub as GitHubIcon,
  Public as PublicIcon,
  PublicOff as PrivateIcon,
  AccountBoxRounded as UserIcon,
  SettingsOutlined as SettingsIcon,
  ListAlt as ListIcon,
  CreditCard as BillingIcon,
} from "@mui/icons-material";

import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { ConfirmAccount } from "../pages/auth/ConfirmAccount";
import { ConfirmPassword } from "../pages/auth/ConfirmPassword";

import { Manufacturer } from "../pages/Manufacturer/Manufacturer";
import { Workspace } from "../pages/Workspace/Workspace";
import { Home } from "../pages/Home";

import { Route } from "../types/Route";

const routes: Array<Route> = [
  //First page
  {
    title: "Welcome",
    component: Home,
    path: "/",
    icon: HomeIcon,
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
    path: "/dashboard",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Замовлення",
    path: "/order",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Покупці",
    path: "/customer",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Виробники",
    component: Manufacturer,
    path: "/manufacturer",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Продукція",
    path: "/item",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Штат",
    path: "/employee",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Простір",
    component: Workspace,
    path: "/workspace",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
];

export default routes;
