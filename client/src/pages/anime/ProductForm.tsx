import productFormPageStyle from "./ProductForm.module.scss";

import { useEffect, useState, FC, Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import { isAuthenticated, isProductModerator } from "../../redux/slices/user";
import { fetchAnimeCreating } from "../../redux/slices/anime";
import { fetchCategories } from "../../redux/slices/category";
import { fetchCreators } from "../../redux/slices/creators";
import { fetchStatuses } from "../../redux/slices/status";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "../../utils/axios";

import FormProduct from "../../components/ui copy/forms/FormProduct";
import ErrorAlert from "../../components/ui copy/forms/ErrorAlert";

interface ProductFormsProps {
  isEditing: boolean;
  isAnime: boolean;
}

const ProductForms: FC<ProductFormsProps> = ({ isEditing, isAnime }) => {
  const { categories } = useSelector((state: any) => state.categories);
  const { creators } = useSelector((state: any) => state.creators);
  const { statuses } = useSelector((state: any) => state.statuses);
  const isCategoriesLoading: boolean = categories.status === "loading";
  const isCreatorsLoading: boolean = creators.status === "loading";
  const isStatusesLoading: boolean = statuses.status === "loading";

  const isPM = useSelector(isProductModerator);
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imagesArray: string[] = [];
  const imagesArrayFile: any[] = [];

  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([""]);
  const [imagesFile, setImagesFile] = useState();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCreators());
    dispatch(fetchStatuses());
  }, []);

  const onSubmitCreate = async (values: FieldValues) => {
    values.images = images;
    console.log(values);
    if (await dispatch(fetchAnimeCreating(values))) {
      const formData = new FormData();
      // @ts-ignore
      for (let i = 0; i < imagesFile.length; i++) {
        // @ts-ignore
        formData.append("image", imagesFile[i]);
      }
      await axios.post("/upload", formData);
      navigate("/anime");
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

  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isPM && isPM !== undefined) return <Navigate to="/" />;

  return (
    <div className={productFormPageStyle.product__form}>
      <FormProduct
        title={
          isEditing
            ? isAnime
              ? "Edit Anime"
              : "Edit Manga"
            : isAnime
            ? "Create Anime"
            : "Create Manga"
        }
        isPost={true}
        width="50%"
        onSubmit={handleSubmit(onSubmitCreate)}
      >
        <div className={productFormPageStyle.titles}>
          <div className={productFormPageStyle.titles__inputs}>
            <input
              type="text"
              id="title"
              placeholder="Enter title..."
              {...register("title", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />
            <input
              type="text"
              id="originTitle"
              placeholder="Enter origin title..."
              {...register("originTitle", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />
          </div>

          <div className={productFormPageStyle.titles__errors}>
            {errors.title &&
              (errors.title.type === "minLength" ||
                errors.title.type === "maxLength") && (
                <ErrorAlert error="Each titles must be 6-20 symbols!" />
              )}
            {!errors.title &&
              errors.originTitle &&
              (errors.originTitle.type === "minLength" ||
                errors.originTitle.type === "maxLength") && (
                <ErrorAlert error="Each titles must be 6-20 symbols!" />
              )}
          </div>
        </div>
        <div className={productFormPageStyle.selects}>
          <div className={productFormPageStyle.selects__input}>
            <select
              id="categoriesArray"
              multiple={true}
              {...register("categoriesArray", {
                required: true,
              })}
            >
              {(isCategoriesLoading ? [...Array(2)] : categories.items).map(
                (obj: typeof categories | undefined, index: Key) =>
                  !isCategoriesLoading && (
                    <option
                      label={obj.title}
                      value={obj._id}
                      key={index}
                      //   selected={
                      //     isEditing &&
                      //     categoriesArray &&
                      //     categoriesArray.some((id) => id === obj._id)
                      //   }
                    />
                  )
              )}
            </select>
            <select
              id="status"
              {...register("status", {
                required: true,
              })}
            >
              <option value="">Select status</option>
              {(isStatusesLoading ? [...Array(1)] : statuses.items).map(
                (obj: typeof statuses | undefined, index: Key) =>
                  !isStatusesLoading && (
                    <option
                      label={obj.title}
                      value={obj._id}
                      key={index}
                      //   selected={isEditing && obj._id === status}
                    />
                  )
              )}
            </select>
            <select
              id="author"
              {...register("author", {
                required: true,
              })}
            >
              <option value="">Select author</option>
              {(isCreatorsLoading ? [...Array(1)] : creators.items).map(
                (obj: typeof creators | undefined, index: Key) =>
                  !isCreatorsLoading && (
                    <option
                      label={obj.fullname}
                      value={obj._id}
                      key={index}
                      //   selected={isEditing && obj._id === author}
                    />
                  )
              )}
            </select>
            <select id="characters" multiple={true}>
              <option value="">Select</option>
              <option value="">Select</option>
              <option value="">Select</option>
              <option value="">Select</option>
            </select>
          </div>
          <div className={productFormPageStyle.selects__errors}>
            {errors.categoriesArray &&
              errors.categoriesArray.type === "required" && (
                <ErrorAlert error="This field is required!" />
              )}
            {!errors.categoriesArray &&
              errors.status &&
              errors.status.type === "required" && (
                <ErrorAlert error="This field is required!" />
              )}
            {!errors.categoriesArray &&
              !errors.status &&
              errors.author &&
              errors.author.type === "required" && (
                <ErrorAlert error="This field is required!" />
              )}
          </div>
        </div>
        <div className={productFormPageStyle.numbers_and_description}>
          <div className={productFormPageStyle.numbers}>
            <input
              type="number"
              id="seasons"
              placeholder="Enter seasons count..."
              {...register("seasons", {
                required: true,
              })}
            />
            <input
              type="number"
              id="series"
              placeholder="Enter series count..."
              {...register("series", {
                required: true,
              })}
            />
            <input
              type="text"
              id="years"
              placeholder="Enter years..."
              max={12}
              {...register("years", {
                required: true,
                minLength: 4,
                maxLength: 16,
              })}
            />
          </div>
          <div className={productFormPageStyle.description}>
            <textarea
              id="description"
              placeholder="Enter description..."
              {...register("description", {
                required: true,
              })}
            ></textarea>
          </div>
        </div>
        {(errors.seasons && errors.seasons.type === "required") ||
          (errors.series && errors.series.type === "required") ||
          (errors.years && errors.years.type === "required" && (
            <ErrorAlert error="This field is required!" />
          ))}
        {!(errors.seasons && errors.seasons.type === "required") ||
          !(errors.series && errors.series.type === "required") ||
          !(
            errors.years &&
            errors.years.type === "required" &&
            errors.years &&
            errors.years &&
            (errors.years.type === "minLength" ||
              errors.years.type === "maxLength") && (
              <ErrorAlert error="This field must be 6-20 symbols!" />
            )
          )}
        <input
          type="file"
          id="images"
          onChange={onFileChange}
          multiple={true}
        />
        <input type="submit" value={isEditing ? "Update" : "Create"} />
      </FormProduct>
    </div>
  );
};

export default ProductForms;
