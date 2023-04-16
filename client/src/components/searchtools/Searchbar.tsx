import searchToolsStyle from "./Searchtools.module.scss";

import { FC } from "react";

interface SearchbarProps {
  placeholder?: string;
}

const Searchbar: FC<SearchbarProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={searchToolsStyle.searchbar}
    />
  );
};

export default Searchbar;
