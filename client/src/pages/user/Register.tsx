import styles from "../../assets/stylesForAddingPages/Adding.module.scss";
import registerStyles from "./Login.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import { fetchRegister, isAuthenticated } from "../../redux/slices/user";
import { Navigate } from "react-router-dom";
import { useRef, useState } from "react";

import Button from "../../components/ui/buttons/Button";
import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";

const Register = () => {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (values: FieldValues) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) return alert("Register failed client");

    if ("token" in data.payload)
      window.localStorage.setItem("token", data.payload.token);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.adding__page}>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <FormContainer title={"Register User"}>
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
            type="fullName"
            placeholder="Enter the fullName"
            id="fullName"
            {...register("fullName", { required: "Enter the fullName" })}
            className={registerStyles.form__input}
          />
          <input
            type="submit"
            value="Register"
            className={registerStyles.button}
          />
        </FormContainer>
      </form>
    </div>
  );
};

export default Register;
