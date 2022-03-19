import { FC } from "react";
import { Redirect } from "react-router-dom";

export const Guard: FC = ({ children }) => {
  const isUser = localStorage.getItem("token");

  if (!isUser) return <Redirect to="/auth/sign-in" />;

  return <>{children}</>;
};
