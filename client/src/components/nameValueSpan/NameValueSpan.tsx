import NameValueSpanStyle from "./NameValueSpan.module.scss";

import { FC, useState } from "react";

interface NameValueSpanProps {
  name: string;
  value: string | number;
  minWidth: string;
  isHidden?: boolean;
}

const NameValueSpan: FC<NameValueSpanProps> = ({
  name,
  value,
  minWidth,
  isHidden,
}) => {
  const [hidden, setHidden] = useState(isHidden);

  return (
    <div
      className={NameValueSpanStyle.name__value__span}
      style={{ minWidth: minWidth }}
    >
      <span className={NameValueSpanStyle.name}>{name}</span>
      {isHidden ? (
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
          {hidden ? (
            <span
              onClick={() => setHidden(false)}
              style={{ backgroundColor: "transparent", cursor: "pointer" }}
            >
              Show
            </span>
          ) : value ? (
            value
          ) : (
            "Loading"
          )}
        </span>
      ) : (
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
          {value || value === 0 ? value : "Loading"}
        </span>
      )}
    </div>
  );
};

export default NameValueSpan;
