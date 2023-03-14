import styles from "./IconContainer.module.scss";

import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { ReactNode } from "react";
import { MouseEventHandler, FC } from "react";

const IconContainer = ({
  children,
  customIcon,
  size,
  color,
  link,
  onClick,
}: {
  children: ReactNode;
  customIcon?: string;
  size: string;
  color: string;
  link?: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <IconContext.Provider value={{ size: size, color: color }}>
      {link ? (
        <Link to={link}>
          <div className={styles.icon__container + " " + customIcon}>
            {children}
          </div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={styles.icon__container + " " + customIcon}
        >
          {children}
        </div>
      )}
    </IconContext.Provider>
  );
};

export default IconContainer;
