import formProductStyle from "./FormProduct.module.scss";

import { FC, FormEventHandler } from "react";

interface FormProductProps {
  width: string;
  title: string;
  children: JSX.Element | JSX.Element[] | any;
  imgLink?: string;
  isPost?: boolean;
  onSubmit?: FormEventHandler;
}

const Form: FC<FormProductProps> = ({
  width,
  title,
  children,
  imgLink,
  isPost,
  onSubmit,
}) => {
  return (
    <div className={formProductStyle.form__block} style={{ width: width }}>
      <span className={formProductStyle.title}>{title}</span>
      <form
        method={isPost ? "POST" : "GET"}
        className={formProductStyle.form__product}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
};

export default Form;
