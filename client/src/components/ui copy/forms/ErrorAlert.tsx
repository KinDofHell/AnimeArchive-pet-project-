import errorAlertStyle from "./ErrorAlert.module.scss";

import { FC } from "react";

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
  return <span className={errorAlertStyle.error__alert}>{error}</span>;
};

export default ErrorAlert;
