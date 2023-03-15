import styles from "./AnimeItem.module.scss";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/Ai";
import { Link } from "react-router-dom";
import { FC } from "react";

import IconContainer from "../ui/iconContainer/IconContainer";
import Button from "../ui/buttons/Button";

interface Props {
  _id?: string;
  title: string;
  image?: string;
  isEditable: boolean | undefined;
  isWatched?: boolean;
}

const AnimeItem: FC<Props> = ({ _id, title, image, isEditable, isWatched }) => {
  return (
    <div className={styles.anime__item}>
      <div className={styles.image}>
        {image ? (
          <img src={image} alt={title} className={styles.img} />
        ) : (
          "Image will be soon"
        )}
      </div>
      <div
        className={styles.title}
        style={
          isWatched
            ? { backgroundColor: "green" }
            : { backgroundColor: "white" }
        }
      >
        <Link to={`/anime/${_id}`}>
          <Button label={title} customStyle={styles.btn__Title} />
        </Link>
        {isEditable && (
          <div className={styles.editable}>
            <IconContainer
              size={"50%"}
              color={"green"}
              customIcon={styles.icon}
              link={"#"}
            >
              <AiOutlineEdit />
            </IconContainer>
            <IconContainer
              size={"50%"}
              color={"darkred"}
              customIcon={styles.icon}
            >
              <AiOutlineDelete />
            </IconContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeItem;
