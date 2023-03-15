import { FC, ReactNode } from "react";
import styles from "./FormSelect.module.scss";

interface Props {
  multiple?: boolean;
  children: ReactNode;
}

const FormSelect: FC<Props> = ({ multiple, children }) => {
  return (
    <select className={styles.form__select} multiple={multiple ? true : false}>
      {children}
    </select>
  );
};

export default FormSelect;
