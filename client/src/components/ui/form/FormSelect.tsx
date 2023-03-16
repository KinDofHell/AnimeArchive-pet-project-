import { ChangeEventHandler, FC, ReactNode } from "react";
import styles from "./FormSelect.module.scss";

interface Props {
  multiple?: boolean;
  children: ReactNode;
  onChange?: ChangeEventHandler;
}

const FormSelect: FC<Props> = ({ multiple, children, onChange }) => {
  return (
    <select
      className={styles.form__select}
      multiple={multiple ? true : false}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default FormSelect;
