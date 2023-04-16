import buttonStyle from "./Button.module.scss";

import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  label: string;
  linkPath?: string;
  isDanger?: boolean;
  isSuccess?: boolean;
  style?: object;
  onClick?: MouseEventHandler;
}

const Button: FC<ButtonProps> = ({
  label,
  linkPath,
  isDanger,
  isSuccess,
  style,
  onClick,
}) => {
  const danger: string = buttonStyle.danger;
  const success: string = buttonStyle.success;

  return linkPath ? (
    <Link to={linkPath}>
      <div
        className={
          buttonStyle.btn +
          " " +
          (isDanger && danger) +
          " " +
          (isSuccess && success)
        }
        style={style}
      >
        {label}
      </div>
    </Link>
  ) : (
    <div
      className={
        buttonStyle.btn +
        " " +
        (isDanger && danger) +
        " " +
        (isSuccess && success)
      }
      style={style}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Button;
