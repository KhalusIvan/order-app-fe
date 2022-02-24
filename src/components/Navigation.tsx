import React, { ReactElement, FC } from "react";

interface Props {
  title: String;
}

const Navigation: FC<Props> = ({ title }): ReactElement => {
  return <div>{`Navigation`}</div>;
};

export default Navigation;
