import styles from "./FormContainer.module.scss";
import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

const FormContainer: FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.form__container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.fields}>{children}</div>
    </div>
  );
};

export default FormContainer;
