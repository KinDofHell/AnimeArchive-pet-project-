import userFormPageStyle from "./UserForms.module.scss";

import { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import {
  fetchLogin,
  fetchRegister,
  isAuthenticated,
} from "../../redux/slices/user";
import { Navigate } from "react-router-dom";

import axios from "../../utils/axios";

import Form from "../../components/ui copy/forms/formUser/Form";
import ErrorAlert from "../../components/ui copy/forms/ErrorAlert";

interface UserFormsProps {
  isRegister: boolean;
}

const UserForms: FC<UserFormsProps> = ({ isRegister }) => {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch<any>();
  const [registered, setRegistered] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [passwordMatching, setPasswordMatching] = useState<boolean>(false);

  const imagesArray: string[] = [];
  const imagesArrayFile: any[] = [];

  const [images, setImages] = useState<string[]>();
  const [imagesFile, setImagesFile] = useState();

  useEffect(() => {
    if (passwordRepeat === password) {
      setPasswordMatching(true);
      console.log(passwordMatching);
    }
  }, [passwordRepeat]);

  const onSubmitLogin = async (values: FieldValues) => {
    const data = await dispatch(fetchLogin(values));

    if (!data.payload) return alert("Authorization failed");

    if ("token" in data.payload)
      window.localStorage.setItem("token", data.payload.token);
  };

  const onSubmitRegister = async (values: FieldValues) => {
    if (images) values.avatarUrl = images[0];
    if (await axios.post("/register", values)) {
      if (imagesFile) {
        const formData = new FormData();
        // @ts-ignore
        for (let i = 0; i < imagesFile.length; i++) {
          // @ts-ignore
          formData.append("image", imagesFile[i]);
        }
        await axios.post("/upload", formData);
      }
      console.log(values);
      setRegistered(true);
    }
  };

  const onFileChange = async (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      imagesArray.push(`/uploads/${event.target.files[i].name}`);
      imagesArrayFile.push(event.target.files[i]);
    }
    setImages(imagesArray);
    // @ts-ignore
    setImagesFile(imagesArrayFile);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  if (isRegister && registered) return <Navigate to="/login" />;

  return (
    <div className={userFormPageStyle.user__form}>
      <Form
        title={isRegister ? "Create Account" : "Sign In"}
        isPost={true}
        width="30%"
        onSubmit={handleSubmit(isRegister ? onSubmitRegister : onSubmitLogin)}
        isRegister={isRegister}
      >
        {isRegister && (
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
        )}
        {isRegister &&
          errors.fullName &&
          (errors.fullName.type === "minLength" ||
            errors.fullName.type === "maxLength") && (
            <ErrorAlert error="Full name must be 6-20 symbols!" />
          )}
        {isRegister &&
          errors.fullName &&
          errors.fullName.type === "required" && (
            <ErrorAlert error="This field is required!" />
          )}
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <ErrorAlert error="This field is required!" />
        )}
        {
          <input
            type="password"
            id="password"
            placeholder={
              isRegister ? "Create your password" : "Enter the password"
            }
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 30,
            })}
          />
        }
        {errors.password &&
          (errors.password.type === "minLength" ||
            errors.password.type === "maxLength") && (
            <ErrorAlert error="Password must be 6-20 symbols!" />
          )}
        {errors.password && errors.password.type === "required" && (
          <ErrorAlert error="This field is required!" />
        )}
        {isRegister && (
          <input
            type="password"
            id="passwordRepeat"
            placeholder="Repeat your password"
            onInput={(e) =>
              setPasswordRepeat((e.target as HTMLInputElement).value)
            }
            {...register("passwordRepeat", {
              required: true,
            })}
          />
        )}
        {isRegister &&
          errors.passwordRepeat &&
          errors.passwordRepeat.type === "required" && (
            <ErrorAlert error="This field is required!" />
          )}
        {isRegister &&
          password !== passwordRepeat &&
          password.length > 0 &&
          passwordRepeat.length > 0 && (
            <ErrorAlert error="Your passwords don't match" />
          )}
        {isRegister && (
          <input type="file" id="avatarUrl" onChange={onFileChange} />
        )}
        {isRegister ? (
          <input type="submit" value="Create" />
        ) : (
          <input type="submit" value="Sign In" />
        )}
      </Form>
    </div>
  );
};

export default UserForms;
