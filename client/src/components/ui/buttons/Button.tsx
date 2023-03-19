import btn from "./Button.module.scss";

import { MouseEventHandler, FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  link?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  margin?: string;
  width?: string;
  fontSize?: string;
  customStyle?: string;
}

const Button: FC<Props> = ({
  label,
  link,
  onClick,
  disabled,
  color,
  backgroundColor,
  margin,
  width,
  fontSize,
  customStyle,
}) => {
  if (link)
    return (
      <Link to={link} style={{ margin: margin, width: width }}>
        <button
          className={
            btn.btn__general + " " + btn.btn__bigScreen + " " + customStyle
          }
          style={{
            color: color,
            backgroundColor: backgroundColor,
            fontSize: fontSize,
            width: "100%",
          }}
        >
          {label}
        </button>
      </Link>
    );
  else
    return (
      <button
        className={
          btn.btn__general + " " + btn.btn__bigScreen + " " + customStyle
        }
        onClick={onClick}
        style={{
          color: color,
          backgroundColor: backgroundColor,
          margin: margin,
          width: width,
          fontSize: fontSize,
        }}
        disabled={disabled}
      >
        {label}
      </button>
    );
};

export default Button;
