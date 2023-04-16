import formStyle from "./Form.module.scss";

import { FC, FormEventHandler } from "react";

import Button from "../buttons/Button";
import Image from "../images/Image";

interface FormProps {
  isRegister?: boolean;
  isPost?: boolean;
  children: JSX.Element | JSX.Element[] | any;
  title: string;
  width: string;
  onSubmit: FormEventHandler;
  imgLink?: string;
}

const Form: FC<FormProps> = ({
  isRegister,
  isPost,
  children,
  title,
  width,
  onSubmit,
  imgLink,
}) => {
  return (
    <div className={formStyle.form__block} style={{ width: width }}>
      {isRegister && (
        <div className={formStyle.avatar}>
          <Image
            minWidth="5vw"
            minHeight="2vw"
            maxWidth="5vw"
            imgLink={imgLink}
            allBordered={true}
          />
        </div>
      )}

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
