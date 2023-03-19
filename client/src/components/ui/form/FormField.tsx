import styles from "./FormField.module.scss";
import { ChangeEventHandler, FC, Ref } from "react";

interface Props {
  textarea?: boolean;
  customStyle?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler;
  hidden?: boolean;
  required?: boolean;
  id?: string;
}

const FormField: FC<Props> = ({
  textarea,
  customStyle,
  value,
  placeholder,
  type,
  onChange,
  hidden,
  required,
  id,
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
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        hidden={hidden}
        required={required}
      />
    );
  } else
    return (
      <textarea
        className={styles.form__textarea + " " + customStyle}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        hidden={hidden}
        defaultValue={value}
        required={required}
      ></textarea>
    );
};

export default FormField;
