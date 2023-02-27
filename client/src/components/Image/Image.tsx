import styles from "./Image.module.scss";

import { Link } from "react-router-dom";

const Image = ({
  src,
  customStyleImage,
  linkPath,
}: {
  src: string;
  customStyleImage?: string;
  linkPath: string;
}) => {
  return (
    <Link to={linkPath}>
      <img
        src={
          src
            ? src
            : "https://img.freepik.com/premium-vector/worker-anime-error-404-page-not-found_150972-701.jpg"
        }
        alt={src ? src : "not found"}
        className={styles.image + " " + customStyleImage}
      />
    </Link>
  );
};

export default Image;
