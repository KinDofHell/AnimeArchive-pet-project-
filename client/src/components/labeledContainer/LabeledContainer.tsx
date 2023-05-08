import lContainerStyle from "./LabeledContainer.module.scss";

import { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface LabeledContainerProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  linkPath?: string;
  attractiveTitle?: boolean;
  children: JSX.Element | JSX.Element[];
}

const LabeledContainer: FC<LabeledContainerProps> = ({
  label,
  linkPath,
  attractiveTitle,
  children,
}) => {
  return (
    <div className={lContainerStyle.labeled__container}>
      <div
        className={lContainerStyle.title}
        style={attractiveTitle ? { backgroundColor: "Goldenrod" } : {}}
      >
        {linkPath ? (
          <Link to={linkPath}>
            <span style={attractiveTitle ? { color: "black" } : {}}>
              {label}
            </span>
          </Link>
        ) : (
          <span style={attractiveTitle ? { color: "black" } : {}}>{label}</span>
        )}
      </div>
      <div className={lContainerStyle.content}>{children}</div>
    </div>
  );
};

export default LabeledContainer;
