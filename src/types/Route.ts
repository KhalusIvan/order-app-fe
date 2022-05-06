import { ComponentType, FC } from "react";

export type Route = {
  title: string;
  path?: string;
  component?: FC<{}>;
  icon?: string;
  subRoutes?: Route[];
  appendDivider?: boolean;
  expanded?: boolean;
  sidebar?: boolean;
  authentificated?: boolean;
};
