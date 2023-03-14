import styles from "./Searchbar.module.scss";

import { ChangeEventHandler, FC } from "react";

interface Props {
  customStyleInput?: string;
  customStyle?: string;
  onChangeHandler?: ChangeEventHandler;
}

const Searchbar: FC<Props> = ({
  customStyleInput,
  customStyle,
  onChangeHandler,
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
