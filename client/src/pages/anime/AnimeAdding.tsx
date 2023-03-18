import styles from "../../assets/stylesForAddingPages/Adding.module.scss";
import wideForm from "./AnimeAdding.module.scss";

import { SERVER_HOST } from "../../data/Constant";

import { AiOutlineDelete } from "react-icons/Ai";

import { useState, useRef, useEffect, Key } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchCategories } from "../../redux/slices/category";
import { fetchCreators } from "../../redux/slices/creators";

import axios from "../../utils/axios";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import FormSelect from "../../components/ui/form/FormSelect";
import FormSelectOption from "../../components/ui/form/FormSelectOption";
import Button from "../../components/ui/buttons/Button";
import Image from "../../components/ui/Image/Image";
import IconContainer from "../../components/ui/iconContainer/IconContainer";

const AnimeAdding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { categories } = useSelector((state: any) => state.categories);
  const { creators } = useSelector((state: any) => state.creators);
  const isCategoriesLoading: boolean = categories.status === "loading";
  const isCreatorsLoading: boolean = creators.status === "loading";

  const [title, setTitle] = useState("");
  const [originTitle, setOriginTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesArray, setCategoriesArray] = useState<string[]>();
  const [seasons, setSeasons] = useState<number>();
  const [series, setSeries] = useState<number>();
  const [years, setYears] = useState("");
  const [status, setStatus] = useState("");
  const [author, setAuthor] = useState<string>();
  const [imgCover, setImgCover] = useState("");
  const [imgAdditional_1, setimgAdditional_1] = useState("");
  const [imgAdditional_2, setimgAdditional_2] = useState("");
  const [imgAdditional_3, setimgAdditional_3] = useState("");

  const inputFileRef_1 = useRef<HTMLInputElement>(null);
  const inputFileRef_2 = useRef<HTMLInputElement>(null);
  const inputFileRef_3 = useRef<HTMLInputElement>(null);
  const inputFileRef_4 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCreators());
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
        seasons,
        series,
        years,
        status,
        author,
        imgCover,
        imgAdditional_1,
        imgAdditional_2,
        imgAdditional_3,
      };
      const { data } = await axios.post("/anime", fields);

      const _id = data._id;
      navigate(`/anime/${_id}`);
    } catch (error) {
      alert("Error creating anime");
      console.warn(error);
    }
  };

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
        <Link to="/category-adding">
          <Button label="Create Category" customStyle={wideForm.btn__adding} />
        </Link>
        <Link to="/creator-adding">
          <Button label="Create Creator" customStyle={wideForm.btn__adding} />
        </Link>
      </div>
      <FormContainer title="Create Anime" customStyles={wideForm.wide__form}>
        <div className={wideForm.titles__description}>
          <div className={wideForm.titles}>
            <FormField
              placeholder="Enter the title"
              type="text"
              required={true}
              // {...register("title", { required: "Enter the title" })}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            />
            <FormField
              placeholder="Enter the origin title"
              type="text"
              required={true}
              // {...register("originTitle", {
              //   required: "Enter the origin title",
              // })}
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
            onChange={(e) =>
              setDescription((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <span className={wideForm.hint}>Choose categories</span>
        <FormSelect multiple={true} onChange={onChangeHandler} required={true}>
          {(isCategoriesLoading ? [...Array(2)] : categories.items).map(
            (obj: typeof categories | undefined, index: Key) =>
              isCategoriesLoading ? (
                <FormSelectOption label="Loading" value="loading" />
              ) : (
                <FormSelectOption
                  label={obj.title}
                  value={obj._id}
                  key={index}
                />
              )
          )}
        </FormSelect>
        <div className={wideForm.seasons__series__years}>
          <FormField
            placeholder="Enter the seasons count"
            type="number"
            customStyle={wideForm.inputWide}
            required={true}
            onChange={(e) =>
              setSeasons(parseInt((e.target as HTMLInputElement).value))
            }
          />
          <FormField
            placeholder="Enter the series count"
            type="number"
            customStyle={wideForm.inputWide}
            required={true}
            onChange={(e) =>
              setSeries(parseInt((e.target as HTMLInputElement).value))
            }
          />
          <FormField
            placeholder="Enter the years of release"
            type="text"
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
          <FormSelectOption label="Select Status" value="" />
          <FormSelectOption label="Ongoing" value="Ongoing" />
          <FormSelectOption label="Finished" value="Finished" />
          <FormSelectOption label="Will be soon" value="Soon" />
          <FormSelectOption label="Abandoned" value="Adandoned" />
        </FormSelect>
        <span className={wideForm.hint}>Choose author</span>
        <FormSelect
          onChange={(e) => setAuthor((e.target as HTMLSelectElement).value)}
          required={true}
        >
          <FormSelectOption label="Select author" value="" />
          {(isCreatorsLoading ? [...Array(2)] : creators.items).map(
            (obj: typeof creators | undefined, index: Key) =>
              isCreatorsLoading ? (
                <FormSelectOption label="Kurosaki" value="ichika" />
              ) : (
                <FormSelectOption
                  label={obj.fullname}
                  value={obj._id}
                  key={index}
                />
              )
          )}
        </FormSelect>
        <Button label="Create" onClick={onSubmit} />
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
            customStyleImage={wideForm.img}
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
            customStyleImage={wideForm.img}
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
            customStyleImage={wideForm.img}
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
            customStyleImage={wideForm.img}
            onClick={() => onButtonCliclImage(4)}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimeAdding;
