import styles from "./Header.module.scss";

import { TITLE } from "../../data/Constant";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import User from "./User";

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <Link to="/">
        <div className={styles.title}>
          <span>{TITLE[0]}</span>
          <span>{TITLE[1]}</span>
        </div>
      </Link>

      <User />
    </header>
  );
};

export default Header;
