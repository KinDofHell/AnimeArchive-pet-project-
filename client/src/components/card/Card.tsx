import { ReactNode } from "react";
import styles from "./Card.module.scss";

type CardT = {
  title: string;
  children: ReactNode;
  customStyleCard?: string;
  customStyleTitle?: string;
  customStyleContent?: string;
};

const Card = ({
  title,
  children,
  customStyleCard,
  customStyleTitle,
  customStyleContent,
}: CardT) => {
  return (
    <div className={styles.card + " " + customStyleCard}>
      <span className={styles.title + " " + customStyleTitle}>{title}</span>
      <div className={styles.content + " " + customStyleContent}>
        {children}
      </div>
    </div>
  );
};

export default Card;
