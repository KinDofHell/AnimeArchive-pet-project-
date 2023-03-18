import styles from "./Button.module.scss";

import { MouseEventHandler, FC } from "react";

interface Props {
  label: string;
  customStyle?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

const Button: FC<Props> = ({ label, customStyle, onClick, disabled }) => {
  return (
    <button
      className={customStyle + " " + styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
