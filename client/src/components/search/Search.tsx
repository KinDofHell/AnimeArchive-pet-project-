import styles from "./Search.module.scss";

import { Link } from "react-router-dom";

import Button from "../ui/buttons/Button";

const Search = () => {
  return (
    <div className={styles.search}>
      <Link to="/anime">
        <Button label={"Update"} customStyle={styles.btn__controll} />
      </Link>
      <Link to="/anime/popular">
        <Button label={"Popular"} customStyle={styles.btn__controll} />
      </Link>
      <Button label={"Categories"} customStyle={styles.btn__controll} />
      <Button label={"Status"} customStyle={styles.btn__controll} />
    </div>
  );
};

export default Search;
