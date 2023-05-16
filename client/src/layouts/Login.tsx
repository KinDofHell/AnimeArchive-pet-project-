import headerStyle from "./HeaderStyle.module.scss";
import avatar from "../assets/imgs/reservAva.jpg";

import { SERVER_HOST } from "../data/Constant";

import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { isAuthenticated, isAdmin, logout } from "../redux/slices/user";

import Button from "../components/ui copy/buttons/Button";

const Login = () => {
  const dispatch = useDispatch<any>();
  const isAuth = useSelector(isAuthenticated);
  const isAdm = useSelector(isAdmin);
  const { user } = useSelector((state: any) => state);

  const isUserLoading = user.status === "loading";
  if (!isUserLoading) console.log();

  const navigate = useNavigate();
  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate(`/`, { replace: true });
    }
  };

  return (
    <div className={headerStyle.login}>
      {isAuth && isAdm ? (
        <Link to="/master-page">
          <span className={headerStyle.name + " " + headerStyle.is__admin}>
            {user.data.fullName}
          </span>
        </Link>
      ) : (
        <span className={headerStyle.name}>
          {isAuth ? user.data.fullName : "Noname"}
        </span>
      )}
      <img
        src={
          isAuth && user.data.avatarUrl
            ? SERVER_HOST + user.data.avatarUrl
            : avatar
        }
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
