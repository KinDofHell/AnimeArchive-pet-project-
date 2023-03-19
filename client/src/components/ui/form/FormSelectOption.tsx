import { FC, ReactNode } from "react";
import styles from "./FormSelectOption.module.scss";

interface Props {
  label: string;
  value: string;
  selected?: boolean;
}

const FormSelectOption: FC<Props> = ({ label, value, selected }) => {
  return (
    <option
      value={value}
      className={styles.form__select__option}
      selected={selected}
    >
      {label}
    </option>
  );
};

export default FormSelectOption;
