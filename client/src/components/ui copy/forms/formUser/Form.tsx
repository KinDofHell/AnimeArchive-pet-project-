import formStyle from "./Form.module.scss";

import { FC, FormEventHandler } from "react";

import Button from "../../buttons/Button";
import Image from "../../images/Image";

interface FormProps {
  isRegister?: boolean;
  isPost?: boolean;
  children: JSX.Element | JSX.Element[] | any;
  title: string;
  width: string;
  onSubmit: FormEventHandler;
}

const Form: FC<FormProps> = ({
  isRegister,
  isPost,
  children,
  title,
  width,
  onSubmit,
}) => {
  return (
    <div className={formStyle.form__block} style={{ width: width }}>
      <span className={formStyle.title}>{title}</span>
      <form
        method={isPost ? "POST" : "GET"}
        className={formStyle.form}
        onSubmit={onSubmit}
      >
        {children}
        {!isRegister && (
          <div className={formStyle.register__block}>
            <Button label="Create account" linkPath="/register" />
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
