import styles from "./IconContainer.module.scss";

import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { ReactNode } from "react";

const IconContainer = ({
  children,
  customIcon,
  size,
  color,
}: {
  children: ReactNode;
  customIcon?: string;
  size: string;
  color: string;
}) => {
  return (
    <IconContext.Provider value={{ size: size, color: color }}>
      <Link>
        <div className={styles.icon__container + " " + customIcon}>
          {children}
        </div>
      </Link>
    </IconContext.Provider>
  );
};

export default IconContainer;
