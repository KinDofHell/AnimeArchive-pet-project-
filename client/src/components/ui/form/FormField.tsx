import styles from "./FormField.module.scss";
import { ChangeEventHandler, FC } from "react";

interface Props {
  textarea?: boolean;
  customStyle?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler;
  hidden?: boolean;
}

const FormField: FC<Props> = ({
  textarea,
  customStyle,
  value,
  placeholder,
  type,
  onChange,
  hidden,
}) => {
  if (!textarea) {
    return (
      <input
        type={type}
        className={
          type === "file"
            ? styles.form__file
            : styles.form__input + " " + customStyle
        }
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        hidden={hidden}
      />
    );
  } else
    return (
      <textarea
        className={styles.form__textarea + " " + customStyle}
        placeholder={placeholder}
        onChange={onChange}
        hidden={hidden}
        defaultValue={value}
      ></textarea>
    );
};

export default FormField;
