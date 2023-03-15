import { FC, ReactNode } from "react";
import styles from "./FormSelectOption.module.scss";

interface Props {
  label: string;
  value: string;
}

const FormSelectOption: FC<Props> = ({ label, value }) => {
  return (
    <option value={value} className={styles.form__select__option}>
      {label}
    </option>
  );
};

export default FormSelectOption;
