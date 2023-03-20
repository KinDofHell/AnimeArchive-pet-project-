import styles from "../../assets/stylesForAddingPages/Adding.module.scss";
import registerStyles from "./Login.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import { fetchLogin, isAuthenticated } from "../../redux/slices/user";
import { Navigate } from "react-router-dom";
import { useRef, useState } from "react";

import Button from "../../components/ui/buttons/Button";
import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";

const Login = () => {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (values: FieldValues) => {
    const data = await dispatch(fetchLogin(values));

    if (!data.payload) return alert("Authorization failed");

    if ("token" in data.payload)
      window.localStorage.setItem("token", data.payload.token);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.adding__page}>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <FormContainer title={"Login User"}>
          <input
            type="email"
            placeholder="Enter the email"
            id="email"
            {...register("email", { required: "Enter the email" })}
            className={registerStyles.form__input}
          />
          <input
            type="password"
            placeholder="Enter the password"
            id="password"
            {...register("password", { required: "Enter the password" })}
            className={registerStyles.form__input}
          />
          <input
            type="submit"
            value="Login"
            className={registerStyles.button}
          />
          <Button
            label="Register"
            link="/register"
            backgroundColor="white"
            color="black"
          />
        </FormContainer>
      </form>
    </div>
  );
};

export default Login;
