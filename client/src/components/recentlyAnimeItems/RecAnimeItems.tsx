import styles from "./RecAnimeItems.module.scss";

import { Link } from "react-router-dom";

import Button from "../ui/buttons/Button";

const RecAnimeItems = ({
  title,
  img,
  link,
}: {
  title: string;
  img: string;
  link: string;
}) => {
  return (
    <div className={styles.rec__anime__items}>
      {img ? (
        <img src={img} alt={title} className={styles.img} />
      ) : (
        <div className={styles.img__notfound}></div>
      )}
      <span className={styles.title}>{title}</span>
      <Link to={link}>
        <Button label={"Show"} customStyle={styles.btn} />
      </Link>
    </div>
  );
};

export default RecAnimeItems;
