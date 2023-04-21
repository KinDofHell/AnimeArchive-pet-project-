import formProductStyle from "./FormProduct.module.scss";

import { FC, FormEventHandler } from "react";

export interface FormProductProps {
  width: string;
  title: string;
  children: JSX.Element | JSX.Element[] | any;
  isPost?: boolean;
  onSubmit?: FormEventHandler;
}

const FormProduct: FC<FormProductProps> = ({
  width,
  title,
  children,
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

export default FormProduct;
