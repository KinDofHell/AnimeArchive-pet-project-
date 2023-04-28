import headerStyle from "./HeaderStyle.module.scss";

import Logo from "./Logo";
import Navbar from "./Navbar";
import Login from "./Login";

const Header = () => {
  return (
    <div className={headerStyle.header}>
      <Logo />
      <div className={headerStyle.burger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Navbar />
      <Login />
    </div>
  );
};

export default Header;
