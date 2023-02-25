import styles from "./Header.module.scss";
import avatar from "../../assets/imgs/PngItem_5680583.png";

import Button from "../../components/ui/Button";

const User = () => {
  const isAuth: boolean = true;
  const status: string = "user";

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
      <span id="status" className={styles.status}>
        {status}
      </span>
      <img
        src={avatar}
        alt="avatar"
        className={styles.avatar}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
      />
      <span className={styles.name}>Ihor Dzhus</span>
      {isAuth ? (
        <Button label="Log Out" customStyle={styles.btn__logout} />
      ) : (
        <Button label="Log In" customStyle={styles.btn__login} />
      )}
    </div>
  );
};

export default User;
