import headerStyle from "./HeaderStyle.module.scss";

import Button from "../components/ui copy/buttons/Button";

const Navbar = () => {
  return (
    <div className={headerStyle.navbar}>
      <div className={headerStyle.btn__group}>
        <Button label="Anime" linkPath="/anime/" />
        <span>|</span>
        <Button label="My List" linkPath="/my-anime-list/" />
      </div>
      <div className={headerStyle.btn__group}>
        <Button label="Manga" linkPath="/manga/" />
        <span>|</span>
        <Button label="My List" linkPath="/my-manga-list/" />
      </div>
      <Button label="News" linkPath="/news/" />
      <Button label="Characters" linkPath="/characters/" />
      <Button label="Gallery" linkPath="/gallery/" />
    </div>
  );
};

export default Navbar;
