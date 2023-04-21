import productFormPageStyle from "./ProductForm.module.scss";

import { useEffect, useState, FC, Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

import { isAuthenticated, isProductModerator } from "../../redux/slices/user";

import { fetchAnimeCreating } from "../../redux/slices/anime";
import { fetchMangaCreating } from "../../redux/slices/manga";
import { fetchCategories } from "../../redux/slices/category";
import { fetchCreators } from "../../redux/slices/creators";
import { fetchStatuses } from "../../redux/slices/status";

import axios from "../../utils/axios";

import FormProduct from "../../components/ui copy/forms/formsProduct/FormProduct";
import ErrorAlert from "../../components/ui copy/forms/ErrorAlert";
import Button from "../../components/ui copy/buttons/Button";

interface ProductFormsProps {
  isEditing: boolean;
  isAnime: boolean;
}

const ProductForms: FC<ProductFormsProps> = ({ isEditing, isAnime }) => {
  const { id } = useParams<string>();
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
    setValue,
  } = useForm();

  const imagesArray: string[] = [];
  const imagesArrayFile: any[] = [];

  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>();
  const [imagesFile, setImagesFile] = useState();

  const [title, setTitle] = useState("");
  const [originTitle, setOriginTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesArray, setCategoriesArray] = useState<string[]>();
  const [seasons, setSeasons] = useState<number>();
  const [chapters, setChapters] = useState<number>();
  const [series, setSeries] = useState<number>();
  const [years, setYears] = useState("");
  const [status, setStatus] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [imagesArr, setImagesArr] = useState<string[]>();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCreators());
    dispatch(fetchStatuses());
  }, []);

  useEffect(() => {
    if (id) {
      let categ: string[] = [];
      axios.get(`/${isAnime ? "anime" : "manga"}/${id}`).then(({ data }) => {
        setTitle(data.title);
        setOriginTitle(data.originTitle);
        data.categoriesArray.map((obj: any) => categ.push(obj._id));
        setCategoriesArray(categ);
        setDescription(data.description);
        if (isAnime) {
          setSeries(data.series);
          setSeasons(data.seasons);
        }
        if (!isAnime) setChapters(data.chapters);
        setYears(data.years.join(","));
        setStatus(data.status._id);
        setAuthor(data.author._id);
        setImagesArr(data.images);
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setValue("title", title);
      setValue("originTitle", originTitle);
      setValue("description", description);
      setValue("categoriesArray", categoriesArray);
      setValue("status", status);
      setValue("author", author);
      if (isAnime) {
        setValue("seasons", seasons);
        setValue("series", series);
      }
      if (!isAnime) setValue("chapters", chapters);
      setValue("years", years);
    });
  }, [title]);

  const onSubmitCreate = async (values: FieldValues) => {
    if (images) values.images = images;
    else values.images = imagesArr;
    if (isEditing) {
      if (isAnime) {
        if (await axios.patch(`/anime/${id}/`, values)) {
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
        navigate(`/anime/${id}/`, { replace: true });
      } else {
        if (await axios.patch(`/manga/${id}/`, values)) {
          if (imagesFile) {
            const formData = new FormData();
            // @ts-ignore
            for (let i = 0; i < imagesFile.length; i++) {
              // @ts-ignore
              formData.append("image", imagesFile[i]);
            }
            await axios.post("/upload", formData);
          }
          navigate(`/manga/${id}/`, { replace: true });
        }
      }
    } else if (isAnime) {
      if (await dispatch(fetchAnimeCreating(values))) {
        if (imagesFile) {
          const formData = new FormData();
          // @ts-ignore
          for (let i = 0; i < imagesFile.length; i++) {
            // @ts-ignore
            formData.append("image", imagesFile[i]);
          }
          await axios.post("/upload", formData);
        }
        navigate("/anime", { replace: true });
      }
    } else {
      if (await dispatch(fetchMangaCreating(values))) {
        if (imagesFile) {
          const formData = new FormData();
          // @ts-ignore
          for (let i = 0; i < imagesFile.length; i++) {
            // @ts-ignore
            formData.append("image", imagesFile[i]);
          }
          await axios.post("/upload", formData);
        }
        navigate("/manga", { replace: true });
      }
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
      <div className={productFormPageStyle.btn__group}>
        <Button label="Create Category" linkPath="/category-adding/" />
        <Button label="Create Status" linkPath="/status-adding/" />
      </div>
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
              value={title}
              placeholder="Enter title..."
              {...register("title", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            />
            <input
              type="text"
              id="originTitle"
              value={originTitle}
              placeholder="Enter origin title..."
              {...register("originTitle", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              onChange={(e) =>
                setOriginTitle((e.target as HTMLInputElement).value)
              }
            />
          </div>

          <div className={productFormPageStyle.titles__errors}>
            {!isEditing &&
              errors.title &&
              (errors.title.type === "minLength" ||
                errors.title.type === "maxLength") && (
                <ErrorAlert error="Each titles must be 6-20 symbols!" />
              )}
            {!isEditing &&
              !errors.title &&
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
              value={categoriesArray}
              {...register("categoriesArray", {
                required: true,
              })}
            >
              {(isCategoriesLoading ? [...Array(2)] : categories.items).map(
                (obj: typeof categories | undefined, index: Key) =>
                  !isCategoriesLoading && (
                    <option label={obj.title} value={obj._id} key={index} />
                  )
              )}
            </select>
            <select
              id="status"
              value={status}
              {...register("status", {
                required: true,
              })}
            >
              <option value="">Select status</option>
              {(isStatusesLoading ? [...Array(1)] : statuses.items).map(
                (obj: typeof statuses | undefined, index: Key) =>
                  !isStatusesLoading && (
                    <option label={obj.title} value={obj._id} key={index} />
                  )
              )}
            </select>
            <select
              id="author"
              value={author}
              {...register("author", {
                required: true,
              })}
            >
              <option value="">Select author</option>
              {(isCreatorsLoading ? [...Array(1)] : creators.items).map(
                (obj: typeof creators | undefined, index: Key) =>
                  !isCreatorsLoading && (
                    <option label={obj.fullname} value={obj._id} key={index} />
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
            {!isEditing &&
              errors.categoriesArray &&
              errors.categoriesArray.type === "required" && (
                <ErrorAlert error="This field is required!" />
              )}
            {!isEditing &&
              !errors.categoriesArray &&
              errors.status &&
              errors.status.type === "required" && (
                <ErrorAlert error="This field is required!" />
              )}
            {!isEditing &&
              !errors.categoriesArray &&
              !errors.status &&
              errors.author &&
              errors.author.type === "required" && (
                <ErrorAlert error="This field is required!" />
              )}
          </div>
        </div>
        <div className={productFormPageStyle.numbers_and_description}>
          <div className={productFormPageStyle.numbers}>
            {isAnime ? (
              <input
                type="number"
                id="seasons"
                value={seasons}
                placeholder="Enter seasons count..."
                {...register("seasons", {
                  required: true,
                })}
                onChange={(e) =>
                  setSeasons(parseInt((e.target as HTMLInputElement).value))
                }
              />
            ) : (
              <input
                type="number"
                id="chapters"
                value={chapters}
                placeholder="Enter chapters count..."
                {...register("chapters", {
                  required: true,
                })}
                onChange={(e) =>
                  setChapters(parseInt((e.target as HTMLInputElement).value))
                }
              />
            )}
            {isAnime && (
              <input
                type="number"
                id="series"
                value={series}
                placeholder="Enter series count..."
                {...register("series", {
                  required: true,
                })}
                onChange={(e) =>
                  setSeries(parseInt((e.target as HTMLInputElement).value))
                }
              />
            )}

            <input
              type="text"
              id="years"
              value={years}
              placeholder="Enter years..."
              max={12}
              {...register("years", {
                required: true,
                minLength: 4,
                maxLength: 16,
              })}
              onChange={(e) => setYears((e.target as HTMLInputElement).value)}
            />
          </div>
          <div className={productFormPageStyle.description}>
            <textarea
              id="description"
              value={description}
              placeholder="Enter description..."
              {...register("description", {
                required: true,
              })}
              onChange={(e) =>
                setDescription((e.target as HTMLTextAreaElement).value)
              }
            ></textarea>
          </div>
        </div>
        {(!isEditing &&
          isAnime &&
          errors.seasons &&
          errors.seasons.type === "required") ||
          (errors.series && errors.series.type === "required") ||
          (errors.years && errors.years.type === "required" && (
            <ErrorAlert error="This field is required!" />
          ))}
        {(!isEditing &&
          isAnime &&
          !(errors.seasons && errors.seasons.type === "required")) ||
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
        {(!isEditing &&
          !(
            isAnime &&
            errors.chapters &&
            errors.chapters.type === "required"
          )) ||
          (errors.years && errors.years.type === "required" && (
            <ErrorAlert error="This field is required!" />
          ))}
        {(!isEditing &&
          isAnime &&
          !(errors.chapters && errors.chapters.type === "required")) ||
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
        {!isEditing &&
          errors.description &&
          errors.description.type === "required" && (
            <ErrorAlert error="This field is required!" />
          )}
        {!isEditing &&
          errors.description &&
          !(errors.description.type === "required") &&
          (errors.description.type === "minLength" ||
            errors.description.type === "maxLength") && (
            <ErrorAlert error="This field must be 6-20 symbols!" />
          )}
        <input
          type="file"
          id="images"
          onChange={onFileChange}
          multiple={true}
        />
        <input type="submit" value={isEditing ? "Update" : "Create"} />
      </FormProduct>
      <div className={productFormPageStyle.btn__group}>
        <Button label="Create Creator" linkPath="/creator-adding/" />
        <Button label="Create Character" linkPath="/character-adding/" />
      </div>
    </div>
  );
};

export default ProductForms;
