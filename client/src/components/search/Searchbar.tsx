import styles from "./Searchbar.module.scss";

import { ChangeEventHandler } from "react";

const Searchbar = ({
  customStyleInput,
  customStyle,
  onChangeHandler,
}: {
  customStyleInput?: string;
  customStyle?: string;
  onChangeHandler?: ChangeEventHandler;
}) => {
  return (
    <div className={styles.searchbar + " " + customStyle}>
      <input
        type="text"
        placeholder="Enter the title..."
        className={styles.input + " " + customStyleInput}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Searchbar;
