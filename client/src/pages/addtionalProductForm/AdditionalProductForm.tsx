import additionalProductForm from "./AdditionalProductForm.module.scss";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import axios from "../../utils/axios";

import { isAuthenticated, isProductModerator } from "../../redux/slices/user";

import FormProduct from "../../components/ui copy/forms/formsProduct/FormProduct";
import ErrorAlert from "../../components/ui copy/forms/ErrorAlert";

interface AddtionalProductFormProps {
  type: string;
  isEditing: boolean;
}

const AddtionalProductForm: FC<AddtionalProductFormProps> = ({
  type,
  isEditing,
}) => {
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
    if (
      await axios.post(
        type === "category"
          ? "/category/"
          : type === "status"
          ? "/status/"
          : "creator",
        values
      )
    ) {
      if (type === "creator") {
        if (imagesFile) {
          const formData = new FormData();
          // @ts-ignore
          for (let i = 0; i < imagesFile.length; i++) {
            // @ts-ignore
            formData.append("image", imagesFile[i]);
          }
          await axios.post("/upload", formData);
        }
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
    <div className={additionalProductForm.additional__product__form}>
      <FormProduct
        title={`${isEditing ? "Edit" : "Create"} ${
          type === "category"
            ? "Category"
            : type === "creator"
            ? "Creator"
            : "Status"
        }`}
        width="30%"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(type === "category" || type === "status") && (
          <input
            type="text"
            id="title"
            placeholder="Enter title..."
            {...register("title", {
              required: true,
              minLength: 4,
              maxLength: 20,
            })}
          />
        )}
        {(type === "category" || type === "status") &&
          errors.title &&
          (errors.title.type === "required" ? (
            <ErrorAlert error="This field is required!" />
          ) : (
            <ErrorAlert error="Title must be 4-20 symbols!" />
          ))}
        {type === "creator" && (
          <input
            type="text"
            id="fullname"
            placeholder="Enter fullname..."
            {...register("fullname", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
        )}
        {type === "creator" &&
          errors.fullName &&
          (errors.fullName.type === "required" ? (
            <ErrorAlert error="This field is required!" />
          ) : (
            <ErrorAlert error="Title must be 6-20 symbols!" />
          ))}
        <textarea
          id="description"
          placeholder="Enter description..."
          {...register("description", {
            required: true,
            minLength: 10,
            maxLength: 200,
          })}
        ></textarea>
        {errors.description &&
          (errors.description.type === "required" ? (
            <ErrorAlert error="This field is required!" />
          ) : (
            <ErrorAlert error="Title must be 10-200 symbols!" />
          ))}
        {type === "creator" && (
          <input type="file" id="imgUrl" onChange={onFileChange} />
        )}
        <input type="submit" value="Create" />
      </FormProduct>
    </div>
  );
};

export default AddtionalProductForm;
