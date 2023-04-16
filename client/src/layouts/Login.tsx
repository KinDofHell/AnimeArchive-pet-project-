import headerStyle from "./HeaderStyle.module.scss";
import avatar from "../assets/imgs/reservAva.jpg";

import { useSelector, useDispatch } from "react-redux";

import { isAuthenticated, logout } from "../redux/slices/user";

import Button from "../components/ui copy/buttons/Button";

const Login = () => {
  const dispatch = useDispatch<any>();
  const isAuth = useSelector(isAuthenticated);
  const { user } = useSelector((state: any) => state);

  const isUserLoading = user.status === "loading";
  if (!isUserLoading) console.log();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={headerStyle.login}>
      <span className={headerStyle.name}>
        {isAuth ? user.data.fullName : "Noname"}
      </span>
      <img
        src={isAuth && user.data.avatarUrl ? user.data.avatarUrl : avatar}
        alt="avatar"
      />
      <div className={headerStyle.dropmenu}>
        {isAuth ? (
          <Button label="Sign Out" isDanger={true} onClick={onClickLogout} />
        ) : (
          <Button label="Sign In.." isSuccess={true} linkPath="/login" />
        )}
      </div>
    </div>
  );
};

export default Login;
