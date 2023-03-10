import styles from "./FormContainer.module.scss";
import { ReactNode } from "react";

const FormContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className={styles.form__container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.fields}>{children}</div>
    </div>
  );
};

export default FormContainer;
