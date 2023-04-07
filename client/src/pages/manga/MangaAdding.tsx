import styles from "../../assets/stylesForAddingPages/Adding.module.scss";
import wideForm from "../anime/AnimeAdding.module.scss";

import { SERVER_HOST } from "../../data/Constant";

import { AiOutlineDelete } from "react-icons/Ai";

import { useState, useRef, useEffect, Key } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import { fetchCategories } from "../../redux/slices/category";
import { fetchCreators } from "../../redux/slices/creators";
import { fetchStatuses } from "../../redux/slices/status";
import { isAuthenticated, isProductModerator } from "../../redux/slices/user";

import axios from "../../utils/axios";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import FormSelect from "../../components/ui/form/FormSelect";
import FormSelectOption from "../../components/ui/form/FormSelectOption";
import Button from "../../components/ui/buttons/Button";
import Image from "../../components/ui/Image/Image";
import IconContainer from "../../components/ui/iconContainer/IconContainer";

const MangaAdding = () => {
  const isAuth = useSelector(isAuthenticated);
  const isPM = useSelector(isProductModerator);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { categories } = useSelector((state: any) => state.categories);
  const { creators } = useSelector((state: any) => state.creators);
  const { statuses } = useSelector((state: any) => state.statuses);
  const isCategoriesLoading: boolean = categories.status === "loading";
  const isCreatorsLoading: boolean = creators.status === "loading";
  const isStatusesLoading: boolean = statuses.status === "loading";

  const [title, setTitle] = useState("");
  const [originTitle, setOriginTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesArray, setCategoriesArray] = useState<string[]>();
  const [chapters, setChapters] = useState<number>();
  const [years, setYears] = useState("");
  const [status, setStatus] = useState<string | object>();
  const [author, setAuthor] = useState<string | object>();
  const [imgCover, setImgCover] = useState("");
  const [imgAdditional_1, setimgAdditional_1] = useState("");
  const [imgAdditional_2, setimgAdditional_2] = useState("");
  const [imgAdditional_3, setimgAdditional_3] = useState("");

  const inputFileRef_1 = useRef<HTMLInputElement>(null);
  const inputFileRef_2 = useRef<HTMLInputElement>(null);
  const inputFileRef_3 = useRef<HTMLInputElement>(null);
  const inputFileRef_4 = useRef<HTMLInputElement>(null);

  const isEditing: boolean = Boolean(id);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCreators());
    dispatch(fetchStatuses());
  }, []);

  const onChangeHandler = async (event: any) => {
    const selectedOptions = event.currentTarget.selectedOptions;

    const newCategories = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      newCategories.push(selectedOptions[i].value);
    }
    setCategoriesArray(newCategories);
  };

  const handleChangeFile = async (num: number, event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      if (num === 1) setImgCover(data.url);
      else if (num === 2) setimgAdditional_1(data.url);
      else if (num === 3) setimgAdditional_2(data.url);
      else if (num === 4) setimgAdditional_3(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error uploading");
    }
  };

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        originTitle,
        description,
        categoriesArray,
        chapters,
        years,
        status,
        author,
        imgCover,
        imgAdditional_1,
        imgAdditional_2,
        imgAdditional_3,
      };
      const { data } = isEditing
        ? await axios.patch(`/manga/${id}`, fields)
        : await axios.post("/manga", fields);

      const _id = isEditing ? id : data._id;
      navigate(`/manga/${_id}`);
    } catch (error) {
      alert("Error creating manga");
      console.warn(error);
    }
  };

  useEffect(() => {
    if (id) {
      let categ: string[] = [];
      axios.get(`/manga/${id}`).then(({ data }) => {
        setTitle(data.title);
        setOriginTitle(data.originTitle);
        data.categoriesArray.map((obj: any) => categ.push(obj._id));
        setCategoriesArray(categ);
        setDescription(data.description);
        setChapters(data.chapters);
        setYears(data.years.join(","));
        setStatus(data.status._id);
        setAuthor(data.author._id);
        setImgCover(data.imgCover);
        setimgAdditional_1(data.imgAdditional_1);
        setimgAdditional_2(data.imgAdditional_2);
        setimgAdditional_3(data.imgAdditional_3);
      });
    }
  }, []);
  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isPM && isPM !== undefined) return <Navigate to="/" />;

  const onButtonCliclImage = (num: number) => {
    if (num === 1) {
      if (inputFileRef_1.current) inputFileRef_1.current.click();
    } else if (num === 2) {
      if (inputFileRef_2.current) inputFileRef_2.current.click();
    } else if (num === 3) {
      if (inputFileRef_3.current) inputFileRef_3.current.click();
    } else if (inputFileRef_4.current) inputFileRef_4.current.click();
  };

  const onClickRemoveImage = (num: number) => {
    if (num === 1) {
      setImgCover("");
    } else if (num === 2) setimgAdditional_1("");
    else if (num === 3) setimgAdditional_2("");
    else setimgAdditional_3("");
  };

  return (
    <div className={styles.adding__page + " " + wideForm.wide__page}>
      <div className={wideForm.adding__instrument}>
        <Button
          label="Create Category"
          customStyle={wideForm.btn__adding}
          link="/category-adding"
        />
        <Button
          label="Create Creator"
          customStyle={wideForm.btn__adding}
          link="/creator-adding"
        />
        <Button
          label="Create Status"
          customStyle={wideForm.btn__adding}
          link="/status-adding"
        />
        <Button
          label="Create Character"
          customStyle={wideForm.btn__adding}
          link="/character-adding"
        />
      </div>
      <FormContainer title="Create Manga" customStyles={wideForm.wide__form}>
        <div className={wideForm.titles__description}>
          <div className={wideForm.titles}>
            <FormField
              placeholder="Enter the title"
              type="text"
              value={title}
              required={true}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            />
            <FormField
              placeholder="Enter the origin title"
              type="text"
              value={originTitle}
              required={true}
              onChange={(e) =>
                setOriginTitle((e.target as HTMLInputElement).value)
              }
            />
          </div>
          <FormField
            placeholder="Enter the description"
            textarea={true}
            customStyle={wideForm.textarea}
            required={true}
            value={description}
            onChange={(e) =>
              setDescription((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <span className={wideForm.hint}>Choose categories</span>
        <FormSelect multiple={true} onChange={onChangeHandler} required={true}>
          {(isCategoriesLoading ? [...Array(2)] : categories.items).map(
            (obj: typeof categories | undefined, index: Key) =>
              !isCategoriesLoading && (
                <FormSelectOption
                  label={obj.title}
                  value={obj._id}
                  key={index}
                  selected={
                    isEditing &&
                    categoriesArray &&
                    categoriesArray.some((id) => id === obj._id)
                  }
                />
              )
          )}
        </FormSelect>
        <div className={wideForm.seasons__series__years}>
          <FormField
            placeholder="Enter the chapters count"
            type="number"
            customStyle={wideForm.inputWide}
            required={true}
            value={chapters}
            onChange={(e) =>
              setChapters(parseInt((e.target as HTMLInputElement).value))
            }
          />
          <FormField
            placeholder="Enter the years of release"
            type="text"
            value={years}
            customStyle={wideForm.inputWide}
            required={true}
            onChange={(e) => setYears((e.target as HTMLInputElement).value)}
          />
        </div>
        <span className={wideForm.hint}>Choose status</span>
        <FormSelect
          onChange={(e) => setStatus((e.target as HTMLSelectElement).value)}
          required={true}
        >
          <FormSelectOption label="Select status" value="" />
          {(isStatusesLoading ? [...Array(1)] : statuses.items).map(
            (obj: typeof statuses | undefined, index: Key) =>
              !isStatusesLoading && (
                <FormSelectOption
                  label={obj.title}
                  value={obj._id}
                  key={index}
                  selected={isEditing && obj._id === status}
                />
              )
          )}
        </FormSelect>
        <span className={wideForm.hint}>Choose author</span>
        <FormSelect
          onChange={(e) => setAuthor((e.target as HTMLSelectElement).value)}
          required={true}
        >
          <FormSelectOption label="Select author" value="" />
          {(isCreatorsLoading ? [...Array(1)] : creators.items).map(
            (obj: typeof creators | undefined, index: Key) =>
              !isCreatorsLoading && (
                <FormSelectOption
                  label={obj.fullname}
                  value={obj._id}
                  key={index}
                  selected={isEditing && obj._id === author}
                />
              )
          )}
        </FormSelect>
        {isEditing ? (
          <Button label="Save" onClick={onSubmit} />
        ) : (
          <Button label="Create" onClick={onSubmit} />
        )}
      </FormContainer>
      <div className={wideForm.imgs__container}>
        <div className={wideForm.item}>
          <input
            type="file"
            ref={inputFileRef_1}
            hidden={true}
            onChange={(e) => handleChangeFile(1, e)}
          />
          <IconContainer
            size="6vh"
            color="red"
            onClick={() => onClickRemoveImage(1)}
          >
            <AiOutlineDelete />
          </IconContainer>
          <Image
            src={imgCover ? `${SERVER_HOST}${imgCover}` : ""}
            borderMode={true}
            width="11vw"
            height="9vw"
            onClick={() => onButtonCliclImage(1)}
          />
        </div>
        <div className={wideForm.item}>
          <input
            type="file"
            ref={inputFileRef_2}
            hidden={true}
            onChange={(e) => handleChangeFile(2, e)}
          />
          <IconContainer
            size="6vh"
            color="red"
            onClick={() => onClickRemoveImage(2)}
          >
            <AiOutlineDelete />
          </IconContainer>
          <Image
            src={imgAdditional_1 ? `${SERVER_HOST}${imgAdditional_1}` : ""}
            borderMode={true}
            width="11vw"
            height="9vw"
            onClick={() => onButtonCliclImage(2)}
          />
        </div>
        <div className={wideForm.item}>
          <input
            type="file"
            ref={inputFileRef_3}
            hidden={true}
            onChange={(e) => handleChangeFile(3, e)}
          />
          <IconContainer
            size="6vh"
            color="red"
            onClick={() => onClickRemoveImage(3)}
          >
            <AiOutlineDelete />
          </IconContainer>
          <Image
            src={imgAdditional_2 ? `${SERVER_HOST}${imgAdditional_2}` : ""}
            borderMode={true}
            width="11vw"
            height="9vw"
            onClick={() => onButtonCliclImage(3)}
          />
        </div>
        <div className={wideForm.item}>
          <input
            type="file"
            ref={inputFileRef_4}
            hidden={true}
            onChange={(e) => handleChangeFile(4, e)}
          />
          <IconContainer
            size="6vh"
            color="red"
            onClick={() => onClickRemoveImage(4)}
          >
            <AiOutlineDelete />
          </IconContainer>
          <Image
            src={imgAdditional_3 ? `${SERVER_HOST}${imgAdditional_3}` : ""}
            borderMode={true}
            width="11vw"
            height="9vw"
            onClick={() => onButtonCliclImage(4)}
          />
        </div>
      </div>
    </div>
  );
};

export default MangaAdding;
