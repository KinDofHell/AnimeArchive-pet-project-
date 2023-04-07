import styles from "./Search.module.scss";

import { FC } from "react";

import Button from "../ui/buttons/Button";

interface Props {
  typeProduct: string;
}

const Search: FC<Props> = ({ typeProduct }) => {
  return (
    <div className={styles.search}>
      <Button label={"Update"} link={`/${typeProduct}`} />
      <Button label={"Popular"} link={`/${typeProduct}/popular`} />
      <Button label={"Categories"} />
      <Button label={"Status"} />
    </div>
  );
};

export default Search;
