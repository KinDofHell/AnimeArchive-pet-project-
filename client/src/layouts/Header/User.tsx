import styles from "./Header.module.scss";
import avatar from "../../assets/imgs/PngItem_5680583.png";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { isAuthenticated, logout } from "../../redux/slices/user";

import Button from "../../components/ui/buttons/Button";

const User = () => {
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

  const onMouseEnter = () => {
    let statusSpan: HTMLElement | null = document.getElementById("status");
    console.log(statusSpan);
    if (statusSpan) {
      statusSpan.style.transition = "right 0.5s";
      statusSpan.style.right = "0";
    }
  };

  const onMouseOut = () => {
    let statusSpan: HTMLElement | null = document.getElementById("status");
    if (statusSpan) {
      statusSpan.style.transition = "right 0.5s";
      statusSpan.style.right = "-50px";
    }
  };

  return (
    <div className={styles.user}>
      {/* {isAuth && (
        <span id="status" className={styles.status}>
          {user.data.role}
        </span>
      )} */}

      <img
        src={
          isAuth ? (user.data.avatarUrl ? user.data.avatarUrl : avatar) : avatar
        }
        alt="avatar"
        className={styles.avatar}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
      />
      <span className={styles.name}>
        {isAuth ? user.data.fullName : "Nobody"}
      </span>
      {isAuth ? (
        <Button
          label="Log Out"
          customStyle={styles.btn__logout}
          onClick={onClickLogout}
        />
      ) : (
        <Link to="/login">
          <Button label="Log In" customStyle={styles.btn__login} />
        </Link>
      )}
    </div>
  );
};

export default User;
