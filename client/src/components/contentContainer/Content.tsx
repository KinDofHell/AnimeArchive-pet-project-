import contentStyles from "./ContentStyles.module.scss";

import { FC } from "react";

interface ContentProps {
  children: JSX.Element;
}

const Content: FC<ContentProps> = ({ children }) => {
  return <div className={contentStyles.content}>{children}</div>;
};

export default Content;
