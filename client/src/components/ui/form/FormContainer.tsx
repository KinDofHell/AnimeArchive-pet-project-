import styles from "./FormContainer.module.scss";
import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
  title: string;
  customStyles?: string;
}

const FormContainer: FC<Props> = ({ children, title, customStyles }) => {
  return (
    <div className={styles.form__container + " " + customStyles}>
      <div className={styles.title}>{title}</div>
      <div className={styles.fields}>{children}</div>
    </div>
  );
};

export default FormContainer;
