import styles from "./Button.module.scss";

import { MouseEventHandler } from "react";

const Button = ({
  label,
  customStyle,
  onClick,
}: {
  label: string;
  customStyle?: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button className={customStyle + " " + styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
