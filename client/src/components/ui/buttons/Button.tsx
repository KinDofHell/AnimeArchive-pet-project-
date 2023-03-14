import styles from "./Button.module.scss";

import { MouseEventHandler, FC } from "react";

interface Props {
  label: string;
  customStyle?: string;
  onClick?: MouseEventHandler;
}

const Button: FC<Props> = ({ label, customStyle, onClick }) => {
  return (
    <button className={customStyle + " " + styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
