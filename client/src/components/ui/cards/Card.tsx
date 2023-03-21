import cardStyles from "./Card.module.scss";

import { ReactNode, FC } from "react";

interface Props {
  title: string;
  children: ReactNode;
  flexColumn: boolean;
  flexContentColumn: boolean;
  minWidth?: string;
  contentPadding?: string;
  maxWidth_Height?: boolean;
}

const Card: FC<Props> = ({
  title,
  children,
  flexColumn,
  flexContentColumn,
  minWidth,
  contentPadding,
  maxWidth_Height,
}) => {
  return (
    <div
      className={
        cardStyles.card__general +
        " " +
        cardStyles.card__bigScreen +
        " " +
        (flexColumn
          ? cardStyles.card__flex__column
          : cardStyles.card__flex__row) +
        " " +
        (maxWidth_Height && cardStyles.card__maxWidth_Height)
      }
      style={{ minWidth: minWidth }}
    >
      <span className={cardStyles.card__general__title}>{title}</span>
      <div
        className={
          cardStyles.card__general__content +
          " " +
          (flexContentColumn
            ? cardStyles.card__flex__column
            : cardStyles.card__flex__row)
        }
        style={{ padding: contentPadding }}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
