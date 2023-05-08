import newsStyle from "./NewsStyle.module.scss";

import { useEffect, useState, FC, Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

import { isNewsModerator, isAuthenticated } from "../../redux/slices/user";

import { fetchNewsCreating } from "../../redux/slices/news";
import { fetchCharacters } from "../../redux/slices/character";
import { fetchAnime } from "../../redux/slices/anime";
import { fetchManga } from "../../redux/slices/manga";

import axios from "../../utils/axios";

import FormProduct from "../../components/ui copy/forms/formsProduct/FormProduct";
import ErrorAlert from "../../components/ui copy/forms/ErrorAlert";
import Button from "../../components/ui copy/buttons/Button";

interface NewsFormProps {
  isEditing: boolean;
}

const ProductForms: FC<NewsFormProps> = ({ isEditing }) => {
  const { id } = useParams<string>();
  const { anime } = useSelector((state: any) => state.anime);
  const { manga } = useSelector((state: any) => state.manga);
  const { characters } = useSelector((state: any) => state.characters);
  const isAnimeLoading: boolean = anime.status === "loading";
  const isMangaLoading: boolean = manga.status === "loading";
  const isCharactersLoading: boolean = characters.status === "loading";

  const isNM = useSelector(isNewsModerator);
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

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [linkedAnime, setLinkedAnime] = useState<string[]>();
  const [linkedManga, setLinkedManga] = useState<string[]>();
  const [linkedCharacters, setLinkedCharacters] = useState<string[]>();
  const [linkedOuterThing, setLinkedOuterThing] = useState<string>();
  const [isImportant, setIsImportant] = useState<boolean>();
  const [imagesArr, setImagesArr] = useState<string[]>();

  useEffect(() => {
    dispatch(fetchAnime());
    dispatch(fetchManga());
    dispatch(fetchCharacters());
  }, []);

  useEffect(() => {
    if (id) {
      let anime: string[] = [];
      let manga: string[] = [];
      let characters: string[] = [];
      axios.get(`/news/${id}`).then(({ data }) => {
        setTitle(data.title);
        setDescription(data.description);
        if (data.linkedAnime) {
          data.linkedAnime.map((obj: any) => anime.push(obj._id));
          setLinkedAnime(anime);
        }
        if (data.linkedManga) {
          data.linkedManga.map((obj: any) => manga.push(obj._id));
          setLinkedManga(manga);
        }
        if (data.linkedCharacters) {
          data.linkedCharacters.map((obj: any) => characters.push(obj._id));
          setLinkedCharacters(characters);
        }
        setLinkedOuterThing(data.linkedOuterThing);
        setIsImportant(data.isImportant);
        setImagesArr(data.images);
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setValue("title", title);
      setValue("description", description);
      setValue("linkedAnime", linkedAnime);
      setValue("linkedManga", linkedManga);
      setValue("linkedCharacters", linkedCharacters);
      setValue("linkedOuterThing", linkedOuterThing);
    });
  }, [title]);

  const onSubmitCreate = async (values: FieldValues) => {
    values.isImportant = isImportant;
    if (images) values.images = images;
    else values.images = imagesArr;
    if (isEditing) {
      if (await axios.patch(`/news/${id}/`, values)) {
        if (imagesFile) {
          const formData = new FormData();
          // @ts-ignore
          for (let i = 0; i < imagesFile.length; i++) {
            // @ts-ignore
            formData.append("image", imagesFile[i]);
          }
          await axios.post("/upload", formData);
        }
        navigate(`/news/${id}/`, { replace: true });
      }
    } else if (await dispatch(fetchNewsCreating(values))) {
      if (imagesFile) {
        const formData = new FormData();
        // @ts-ignore
        for (let i = 0; i < imagesFile.length; i++) {
          // @ts-ignore
          formData.append("image", imagesFile[i]);
        }
        await axios.post("/upload", formData);
      }
      navigate("/news", { replace: true });
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

  const arrayChange = async (
    event: any,
    type: "anime" | "manga" | "characters"
  ) => {
    let array: string[] | undefined;
    if (type === "anime") array = linkedAnime;
    else if (type === "manga") array = linkedManga;
    else array = linkedCharacters;

    if (array?.includes(event.target.value))
      array = array.filter((value: string) => value !== event.target.value);
    else array?.push(event.target.value);
    if (type === "anime") setLinkedAnime(array);
    else if (type === "manga") setLinkedManga(array);
    else setLinkedCharacters(array);
  };

  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isNM && isNM !== undefined) return <Navigate to="/" />;

  return (
    <div className={newsStyle.product__form}>
      <FormProduct
        title={isEditing ? "Edit" : "Create" + " News"}
        isPost={true}
        width="50%"
        onSubmit={handleSubmit(onSubmitCreate)}
      >
        <div className={newsStyle.titles}>
          <div className={newsStyle.titles__inputs}>
            <input
              type="text"
              id="title"
              value={title}
              placeholder="Enter title..."
              {...register("title", {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            />
          </div>
          <div className={newsStyle.titles__errors}>
            {errors.title &&
              (errors.title.type === "minLength" ||
                errors.title.type === "maxLength") && (
                <ErrorAlert error="Title must be 4-20 symbols!" />
              )}
          </div>
        </div>
        <div className={newsStyle.selects}>
          <div className={newsStyle.selects__input}>
            <select
              id="linkedAnime"
              multiple={true}
              value={linkedAnime}
              {...register("linkedAnime")}
              onChange={(e) => arrayChange(e, "anime")}
            >
              {(isAnimeLoading ? [...Array(2)] : anime.items).map(
                (obj: typeof anime | undefined, index: Key) =>
                  !isAnimeLoading && (
                    <option label={obj.title} value={obj._id} key={index} />
                  )
              )}
            </select>
            <select
              id="linkedManga"
              multiple={true}
              value={linkedManga}
              {...register("linkedManga")}
              onChange={(e) => arrayChange(e, "manga")}
            >
              {(isMangaLoading ? [...Array(1)] : manga.items).map(
                (obj: typeof manga | undefined, index: Key) =>
                  !isMangaLoading && (
                    <option label={obj.title} value={obj._id} key={index} />
                  )
              )}
            </select>
            <select
              id="linkedCharacters"
              multiple={true}
              value={linkedCharacters}
              {...register("linkedCharacters")}
              onChange={(e) => arrayChange(e, "characters")}
            >
              {(isCharactersLoading ? [...Array(2)] : characters.items).map(
                (obj: typeof characters | undefined, index: Key) =>
                  !isCharactersLoading && (
                    <option label={obj.fullName} value={obj._id} key={index} />
                  )
              )}
            </select>
          </div>
        </div>
        <div className={newsStyle.numbers_and_description}>
          <div className={newsStyle.description}>
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
          type="text"
          id="linkedOuterThing"
          value={linkedOuterThing}
          placeholder="Enter link..."
          {...register("linkedOuterThing")}
          onChange={(e) =>
            setLinkedOuterThing((e.target as HTMLInputElement).value)
          }
        />
        <label>Is important:</label>
        <label>Yes</label>
        <input
          type="radio"
          id="isImportant"
          value="true"
          checked={isImportant}
          {...register("isImportant")}
          onChange={(e) => setIsImportant(true)}
        />
        <label>No</label>
        <input
          type="radio"
          id="isImportant"
          value="false"
          checked={isImportant === false}
          {...register("isImportant")}
          onChange={(e) => setIsImportant(false)}
        />
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
