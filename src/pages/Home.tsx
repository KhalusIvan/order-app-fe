import { Redirect } from "react-router-dom";

export const Home = () => {
  return <Redirect to="/auth/sign-in" />;
};
