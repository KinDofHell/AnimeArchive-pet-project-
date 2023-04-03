import { ChangeEventHandler, FC, ReactNode } from "react";
import styles from "./FormSelect.module.scss";

interface Props {
  multiple?: boolean;
  children: ReactNode;
  onChange?: ChangeEventHandler;
  required?: boolean;
  value?: string | string[];
}

const FormSelect: FC<Props> = ({
  multiple,
  children,
  onChange,
  required,
  value,
}) => {
  return (
    <select
      className={styles.form__select}
      multiple={multiple ? true : false}
      onChange={onChange}
      required={required}
      value={value}
    >
      {children}
    </select>
  );
};

export default FormSelect;
