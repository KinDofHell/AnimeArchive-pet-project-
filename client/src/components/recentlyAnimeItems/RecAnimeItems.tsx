import styles from "./RecAnimeItems.module.scss";

import { Link } from "react-router-dom";
import { FC } from "react";

import Button from "../ui/buttons/Button";

interface Props {
  title: string;
  img: string;
  link: string;
}

const RecAnimeItems: FC<Props> = ({ title, img, link }) => {
  return (
    <div className={styles.rec__anime__items}>
      {img ? (
        <img src={img} alt={title} className={styles.img} />
      ) : (
        <div className={styles.img}></div>
      )}
      <span className={styles.title}>{title}</span>
      <Button label={"Show"} link={link} />
    </div>
  );
};

export default RecAnimeItems;
