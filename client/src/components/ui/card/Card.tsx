import styles from "./Card.module.scss";

import { ReactNode, FC } from "react";

interface Props {
  title: string;
  children: ReactNode;
  customStyleCard?: string;
  customStyleTitle?: string;
  customStyleContent?: string;
}

const Card: FC<Props> = ({
  title,
  children,
  customStyleCard,
  customStyleTitle,
  customStyleContent,
}) => {
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
