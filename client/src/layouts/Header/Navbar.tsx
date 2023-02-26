import styles from "./Header.module.scss";

import Button from "../../components/ui/buttons/Button";

const Navbar = ({ buttonLabel }: { buttonLabel: string[] }) => {
  return (
    <div className={styles.navbar}>
      {buttonLabel.map((button) => (
        <Button label={button} key={buttonLabel.indexOf(button)} />
      ))}
    </div>
  );
};

export default Navbar;
