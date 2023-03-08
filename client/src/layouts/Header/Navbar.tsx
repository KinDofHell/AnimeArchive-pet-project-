import styles from "./Header.module.scss";

import { Link } from "react-router-dom";

import Button from "../../components/ui/buttons/Button";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/anime">
        <Button label={"Anime"} />
      </Link>
      <Link to="/manga">
        <Button label={"Manga"} />
      </Link>
      <Link to="/my-anime">
        <Button label={"My Anime"} />
      </Link>
      <Link to="/my-manga">
        <Button label={"My Manga"} />
      </Link>
      <Link to="/news">
        <Button label={"News"} />
      </Link>
      <Link to="/gallery">
        <Button label={"Gallery"} />
      </Link>
    </div>
  );
};

export default Navbar;
