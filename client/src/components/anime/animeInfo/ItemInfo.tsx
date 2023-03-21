import animeInfoStyles from "./AnimeInfo.module.scss";

import { FC } from "react";

interface Props {
  label: string;
  value: string | number;
}

const ItemInfo: FC<Props> = ({ label, value }) => {
  return (
    <div className={animeInfoStyles.item__info}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default ItemInfo;
