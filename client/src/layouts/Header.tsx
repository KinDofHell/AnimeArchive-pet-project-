import headerStyle from "./HeaderStyle.module.scss";

import Logo from "./Logo";
import Navbar from "./Navbar";
import Login from "./Login";

const Header = () => {
  return (
    <div className={headerStyle.header}>
      <Logo />
      <Navbar />
      <Login />
    </div>
  );
};

export default Header;
