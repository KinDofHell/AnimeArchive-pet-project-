import styles from "./Header.module.scss";

import Button from "../../components/ui/buttons/Button";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Button label={"Anime"} link={"/anime"} />
      <Button label={"Manga"} link={"/manga"} />
      <Button label={"My Anime"} link={"/my-anime"} />
      <Button label={"My Manga"} link={"/my-manga"} />
      <Button label={"News"} link={"/news"} />
      <Button label={"Gallery"} link={"/gallery"} />
    </div>
  );
};

export default Navbar;
