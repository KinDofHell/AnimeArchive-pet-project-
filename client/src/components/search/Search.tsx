import styles from "./Search.module.scss";

import Button from "../ui/buttons/Button";

const Search = () => {
  return (
    <div className={styles.search}>
      <Button label={"Update"} link="/anime" />
      <Button label={"Popular"} link="/anime/popular" />
      <Button label={"Categories"} />
      <Button label={"Status"} />
    </div>
  );
};

export default Search;
