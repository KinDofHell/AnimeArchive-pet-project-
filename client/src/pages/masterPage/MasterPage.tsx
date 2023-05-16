import masterPageStyle from "./MasterPage.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { Key, useEffect, useState } from "react";

import axios from "../../utils/axios";
import { fetchAdminInfo, fetchUserRoles } from "../../redux/slices/admin";
import {
  isAuthenticated,
  isAdmin,
  fetchRemoveUser,
} from "../../redux/slices/user";

import NameValueSpan from "../../components/nameValueSpan/NameValueSpan";
import Form from "../../components/ui copy/forms/formUser/Form";
import ErrorAlert from "../../components/ui copy/forms/ErrorAlert";
import Button from "./../../components/ui copy/buttons/Button";

const MasterPage = () => {
  const isAuth = useSelector(isAuthenticated);
  const isAdm = useSelector(isAdmin);

  const [data, setData] = useState<any>({});
  const [loading, setIsLoading] = useState<boolean>(true);

  const { roles } = useSelector((state: any) => state.roles);

  const isLoadingRoles: boolean = roles.status === "loading";

  const dispatch = useDispatch<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [passwordMatching, setPasswordMatching] = useState<boolean>(false);

  const imagesArray: string[] = [];
  const imagesArrayFile: any[] = [];

  const [images, setImages] = useState<string[]>();
  const [imagesFile, setImagesFile] = useState();

  useEffect(() => {
    dispatch(fetchAdminInfo());
    dispatch(fetchUserRoles());
  }, []);

  useEffect(() => {
    if (passwordRepeat === password) {
      setPasswordMatching(true);
      console.log(passwordMatching);
    }
  }, [passwordRepeat]);

  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isAdm && isAdm !== undefined) return <Navigate to="/" />;

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
      setTimeout(() => {
        setValue("fullName", "");
        setValue("email", "");
        setValue("password", "");
        setValue("passwordRepeat", "");
        setValue("role", "");
      });
    }
  };

  useEffect(() => {
    axios
      .get(`/${"admin-info"}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onFileChange = async (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      imagesArray.push(`/uploads/${event.target.files[i].name}`);
      imagesArrayFile.push(event.target.files[i]);
    }
    setImages(imagesArray);
    // @ts-ignore
    setImagesFile(imagesArrayFile);
  };

  const onClickDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete anime"))
      dispatch(fetchRemoveUser(id));
  };

  return (
    <div className={masterPageStyle.master__page}>
      {!loading && (
        <div className={masterPageStyle.count__info}>
          <span className={masterPageStyle.title}>Number of...</span>
          <div className={masterPageStyle.product}>
            <NameValueSpan
              name="Anime on the Site"
              value={data.anime}
              minWidth="400px"
            />
            <NameValueSpan
              name="Manga on the Site"
              value={data.manga}
              minWidth="400px"
            />
            <NameValueSpan
              name="Characters on the Site"
              value={data.characters}
              minWidth="400px"
            />
          </div>
          <div className={masterPageStyle.news__gallery}>
            <NameValueSpan
              name="News on the Site"
              value={data.news}
              minWidth="400px"
            />
            <NameValueSpan
              name="Images in Gallery"
              value="120"
              minWidth="400px"
            />
          </div>
          <div className={masterPageStyle.users}>
            <NameValueSpan
              name="Users on the Site"
              value={data.users}
              minWidth="400px"
            />
          </div>
        </div>
      )}
      {isAdm && (
        <div className={masterPageStyle.admin__moderators__info}>
          <div className={masterPageStyle.form}>
            <Form
              title={"Create Moderator"}
              isPost={true}
              width="100%"
              onSubmit={handleSubmit(onSubmitRegister)}
              isRegister={true}
            >
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
              {errors.fullName &&
                (errors.fullName.type === "minLength" ||
                  errors.fullName.type === "maxLength") && (
                  <ErrorAlert error="Full name must be 6-20 symbols!" />
                )}
              {errors.fullName && errors.fullName.type === "required" && (
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
                  placeholder="Create your password"
                  onInput={(e) =>
                    setPassword((e.target as HTMLInputElement).value)
                  }
                  {...register("password", {
                    required: true,
                    minLength: 10,
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
              {errors.passwordRepeat &&
                errors.passwordRepeat.type === "required" && (
                  <ErrorAlert error="This field is required!" />
                )}
              {password !== passwordRepeat &&
                password.length > 0 &&
                passwordRepeat.length > 0 && (
                  <ErrorAlert error="Your passwords don't match" />
                )}
              <select id="role" {...register("role")}>
                <option value="">Choose role</option>
                {!isLoadingRoles &&
                  roles.items.map(
                    (obj: typeof roles | undefined, index: Key) => (
                      <option value={obj._id} key={index}>
                        {obj.name}
                      </option>
                    )
                  )}
              </select>
              <input type="file" id="avatarUrl" onChange={onFileChange} />
              <input type="submit" value="Create" />
            </Form>
          </div>
          {!loading && (
            <div className={masterPageStyle.moderators}>
              {data &&
                data.moderators.map((obj: any, index: Key) => (
                  <div className={masterPageStyle.moderator__item} key={index}>
                    <span id="name">{obj.fullName}</span>
                    <span id="name">{obj.role.name}</span>
                    <Button
                      label="Delete user"
                      isDanger={true}
                      onClick={() => onClickDelete(obj._id)}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
      <div className={masterPageStyle.creating}>
        <span className={masterPageStyle.title}>Create Content</span>
        <Button label="Create Anime" linkPath="/anime-adding" />
        <Button label="Create Manga" linkPath="/manga-adding" />
        <Button label="Create Category" linkPath="/category-adding" />
        <Button label="Create Status" linkPath="/status-adding" />
        <Button label="Create Creator" linkPath="/creator-adding" />
        <Button label="Create Character" linkPath="/character-adding" />
      </div>
    </div>
  );
};

export default MasterPage;
