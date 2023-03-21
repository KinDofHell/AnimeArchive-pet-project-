import containerStyles from "./Container.module.scss";

import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <div className={containerStyles.container}>{children}</div>;
};

export default Container;
