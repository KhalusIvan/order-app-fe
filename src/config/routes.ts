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
import { Home } from "../pages/Home";

import { Route } from "../types/Route";

const routes: Array<Route> = [
  {
    title: "Sign in",
    component: SignIn,
    path: "/auth/sign-in",
    sidebar: false,
    authentificated: false,
  },
  {
    title: "welcome",
    component: Home,
    path: "/",
    icon: HomeIcon,
    appendDivider: true,
    sidebar: true,
    authentificated: false,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "GitHub",
    icon: GitHubIcon,
    subRoutes: [
      {
        title: "Public Repos",
        path: "/gh/public",
        icon: PublicIcon,
      },
      {
        title: "Private Repos",
        path: "/gh/private",
        icon: PrivateIcon,
      },
    ],
    sidebar: true,
    authentificated: true,
  },
  {
    title: "Code Editor",
    path: "/code-editor",
    icon: CodeIcon,
    appendDivider: true,
    sidebar: true,
    authentificated: true,
  },
  {
    title: "My Account",
    path: "/account",
    icon: UserIcon,
    subRoutes: [
      {
        title: "Settings",
        path: "/account/settings",
        icon: SettingsIcon,
      },
      {
        title: "Preferences",
        path: "/account/preferences",
        icon: ListIcon,
      },
      {
        title: "Billing",
        path: "/account/billing",
        icon: BillingIcon,
      },
    ],
    sidebar: true,
    authentificated: true,
  },
];

export default routes;
