import styles from "./FormField.module.scss";
import { ChangeEventHandler } from "react";

const FormField = ({
  textarea,
  customStyle,
  value,
  placeholder,
  type,
  onChange,
  hidden,
}: {
  textarea?: boolean;
  customStyle?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler;
  hidden?: boolean;
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
      >
        {value}
      </textarea>
    );
};

export default FormField;
