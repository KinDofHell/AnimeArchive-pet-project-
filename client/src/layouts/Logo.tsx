import headerStyle from "./HeaderStyle.module.scss";
import logo from "../../../../Master React/public/logo.png";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className={headerStyle.logo}>
      <img src={logo} alt="anime-archive" />
      <span className={headerStyle.title}>
        <Link to="/">
          <span>A</span>Archive
        </Link>
      </span>
    </div>
  );
};

export default Logo;
