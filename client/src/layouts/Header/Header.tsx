import styles from "./Header.module.scss";

import { TITLE, NAVBAR_BUTTONS } from "../../data/Constant";

import Navbar from "./Navbar";
import User from "./User";

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar buttonLabel={NAVBAR_BUTTONS} />
      <div className={styles.title}>
        <span>{TITLE[0]}</span>
        <span>{TITLE[1]}</span>
      </div>
      <User />
    </header>
  );
};

export default Header;
