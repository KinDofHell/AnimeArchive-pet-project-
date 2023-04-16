import NameValueSpanStyle from "./NameValueSpan.module.scss";

import { FC } from "react";

interface NameValueSpanProps {
  name: string;
  value: string | number;
  minWidth: string;
}

const NameValueSpan: FC<NameValueSpanProps> = ({ name, value, minWidth }) => {
  return (
    <div
      className={NameValueSpanStyle.name__value__span}
      style={{ minWidth: minWidth }}
    >
      <span className={NameValueSpanStyle.name}>{name}</span>
      <span
        className={NameValueSpanStyle.value}
        style={
          value === "Ongoing"
            ? { backgroundColor: "darkgreen" }
            : value === "Abandoned"
            ? { backgroundColor: "darkred" }
            : {}
        }
      >
        {value ? value : "Loading"}
      </span>
    </div>
  );
};

export default NameValueSpan;
