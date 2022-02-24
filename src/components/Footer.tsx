import React, { ReactElement, FC } from "react";

interface Props {
  title: String;
}

const Footer: FC<Props> = ({ title }): ReactElement => {
  return <div>{`Footer`}</div>;
};

export default Footer;
