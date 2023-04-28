import characterFormPageStyle from "./CharacterFormPage.module.scss";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import axios from "../../utils/axios";

import { isAuthenticated, isProductModerator } from "../../redux/slices/user";

import FormProduct from "../../components/ui copy/forms/formsProduct/FormProduct";
import ErrorAlert from "../../components/ui copy/forms/ErrorAlert";

interface CharacterFormPageProps {
  isEditing: boolean;
}

const CharacterFormPage: FC<CharacterFormPageProps> = ({ isEditing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const imagesArray: string[] = [];
  const imagesArrayFile: any[] = [];

  const [images, setImages] = useState<string[]>();
  const [imagesFile, setImagesFile] = useState();

  const isPM = useSelector(isProductModerator);
  const isAuth = useSelector(isAuthenticated);

  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isPM && isPM !== undefined) return <Navigate to="/" />;

  const onSubmit = async (values: FieldValues) => {
    if (images) values.imgUrl = images[0];
    if (await axios.post("/characters/", values)) {
      if (imagesFile) {
        const formData = new FormData();
        // @ts-ignore
        for (let i = 0; i < imagesFile.length; i++) {
          // @ts-ignore
          formData.append("image", imagesFile[i]);
        }
        await axios.post("/upload", formData);
      }
      navigate(`/anime-adding/`, { replace: true });
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

  return (
    <div className={characterFormPageStyle.characters__page__form}>
      <FormProduct
        title={`${isEditing ? "Edit" : "Create"} Character`}
        width="50%"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={characterFormPageStyle.name__age}>
          <div className={characterFormPageStyle.fields}>
            <input
              type="text"
              id="fullName"
              placeholder="Enter fullname..."
              {...register("fullName", {
                required: true,
                minLength: 6,
                maxLength: 30,
              })}
            />
            <input
              type="text"
              id="age"
              placeholder="Enter age..."
              {...register("age", {
                minLength: 0,
                maxLength: 5,
              })}
            />
          </div>
          <div className={characterFormPageStyle.errors}>
            {errors.fullName &&
              (errors.fullName.type === "required" ? (
                <ErrorAlert error="This field is required!" />
              ) : (
                <ErrorAlert error="Fullname must be 6-30 symbols!" />
              ))}
            {!errors.fullName &&
              errors.age &&
              (errors.age.type === "maxLength" ||
                errors.age.type === "minLength") && (
                <ErrorAlert error="Age must be 1-5 digits!" />
              )}
          </div>
        </div>
        <div className={characterFormPageStyle.sex__race}>
          <div className={characterFormPageStyle.fields}>
            <select
              id="sex"
              {...register("sex", {
                minLength: 4,
                maxLength: 10,
              })}
            >
              <option value="">Choose sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              id="race"
              placeholder="Enter race..."
              {...register("race", {
                required: true,
                minLength: 3,
                maxLength: 15,
              })}
            />
          </div>
          <div className={characterFormPageStyle.errors}>
            {errors.sex &&
              (errors.sex.type === "maxLength" ||
                errors.sex.type === "minLength") && (
                <ErrorAlert error="Sex must be 6-30 symbols!" />
              )}
            {!errors.sex &&
              errors.race &&
              (errors.race.type === "required" ? (
                <ErrorAlert error="This field is required!" />
              ) : (
                <ErrorAlert error="Race must be 3-15 symbols!" />
              ))}
          </div>
        </div>
        <select
          id="status"
          {...register("status", {
            required: true,
            minLength: 4,
            maxLength: 10,
          })}
          style={{ width: "90%", marginBottom: "1%" }}
        >
          <option value="">Choose status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>
        {!errors.fullName &&
          errors.status &&
          (errors.status.type === "required" ? (
            <ErrorAlert error="This field is required!" />
          ) : (
            <ErrorAlert error="Status must be 5-12 symbols!" />
          ))}
        <div className={characterFormPageStyle.texts}>
          <textarea
            id="appearance"
            placeholder="Enter appearance description"
            {...register("appearance", {
              required: true,
            })}
          ></textarea>
          <textarea
            id="personality"
            placeholder="Enter personality description"
            {...register("personality", {
              required: true,
            })}
          ></textarea>
        </div>
        {!errors.status &&
          errors.appearance &&
          errors.appearance.type === "required" && (
            <ErrorAlert error="This field is required!" />
          )}
        {!errors.status &&
          !errors.appearance &&
          errors.personality &&
          errors.personality.type === "required" && (
            <ErrorAlert error="This field is required!" />
          )}
        <input
          type="file"
          id="images"
          onChange={onFileChange}
          multiple={true}
          style={{ width: "90%" }}
        />
        <input type="submit" value="Create" />
      </FormProduct>
    </div>
  );
};

export default CharacterFormPage;
