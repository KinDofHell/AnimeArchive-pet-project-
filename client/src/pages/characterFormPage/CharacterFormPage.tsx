import characterFormPageStyle from "./CharacterFormPage.module.scss";

import { FC, useState, useEffect, Key } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import axios from "../../utils/axios";

import { isAuthenticated, isProductModerator } from "../../redux/slices/user";

import {
  fetchCharacterCreating,
  fetchCharacters,
} from "../../redux/slices/character";

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
    setValue,
  } = useForm();

  const { id } = useParams<string>();

  const [fullName, setFullName] = useState<string>();
  const [age, setAge] = useState<string>();
  const [sex, setSex] = useState<string>();
  const [race, setRace] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [partnersArray, setPartnersArray] = useState<string[]>();
  const [appearance, setAppearance] = useState<string>();
  const [personality, setPersonality] = useState<string>();
  const [imagesArr, setImagesArr] = useState<string[]>();

  const { characters } = useSelector((state: any) => state.characters);
  const isCharactersLoading: boolean = characters.status === "loading";

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const imagesArray: string[] = [];
  const imagesArrayFile: any[] = [];

  const [images, setImages] = useState<string[]>();
  const [imagesFile, setImagesFile] = useState();

  const isPM = useSelector(isProductModerator);
  const isAuth = useSelector(isAuthenticated);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, []);

  useEffect(() => {
    if (id) {
      let partn: string[] = [];
      axios.get(`/character/${id}`).then(({ data }) => {
        setFullName(data.fullName);
        setAge(data.age);
        setSex(data.sex);
        setRace(data.race);
        setStatus(data.status);
        setAppearance(data.appearance);
        setPersonality(data.personality);
        setImagesArr(data.images);
        if (data.partnersArray) {
          data.partnersArray.map((obj: any) => partn.push(obj._id));
          setPartnersArray(partn);
        }
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setValue("fullName", fullName);
      setValue("age", age);
      setValue("sex", sex);
      setValue("race", race);
      setValue("status", status);
      setValue("appearance", appearance);
      setValue("personality", personality);
      setValue("partnersArray", partnersArray);
    });
  }, [fullName]);

  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isPM && isPM !== undefined) return <Navigate to="/" />;

  const arrayChange = async (event: any) => {
    let array: string[] | undefined = partnersArray;

    if (array?.includes(event.target.value))
      array = array.filter((value: string) => value !== event.target.value);
    else array?.push(event.target.value);
    setPartnersArray(array);
  };

  const onSubmit = async (values: FieldValues) => {
    if (images) values.images = images;
    else values.images = imagesArr;
    console.log(values);
    if (isEditing) {
      if (await axios.patch(`/character/${id}/`, values)) {
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
      navigate(`/character/${id}/`, { replace: true });
    } else if (await dispatch(fetchCharacterCreating(values))) {
      if (imagesFile) {
        const formData = new FormData();
        // @ts-ignore
        for (let i = 0; i < imagesFile.length; i++) {
          // @ts-ignore
          formData.append("image", imagesFile[i]);
        }
        await axios.post("/upload", formData);
      }
      navigate("/characters", { replace: true });
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
              value={fullName}
              placeholder="Enter fullname..."
              {...register("fullName", {
                required: true,
                minLength: 6,
                maxLength: 30,
              })}
              onChange={(e) =>
                setFullName((e.target as HTMLInputElement).value)
              }
            />
            <input
              type="text"
              id="age"
              placeholder="Enter age..."
              value={age}
              {...register("age", {
                minLength: 0,
                maxLength: 5,
              })}
              onChange={(e) => setAge((e.target as HTMLInputElement).value)}
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
              value={sex}
              onChange={(e) => setSex((e.target as HTMLSelectElement).value)}
            >
              <option value="">Choose sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              id="race"
              placeholder="Enter race..."
              value={race}
              {...register("race", {
                required: true,
                minLength: 3,
                maxLength: 15,
              })}
              onChange={(e) => setRace((e.target as HTMLInputElement).value)}
            />
          </div>
          <div className={characterFormPageStyle.errors}>
            {!errors.fullName &&
              errors.sex &&
              (errors.sex.type === "maxLength" ||
                errors.sex.type === "minLength") && (
                <ErrorAlert error="Sex must be 6-30 symbols!" />
              )}
            {!errors.fullName &&
              !errors.sex &&
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
          value={status}
          {...register("status", {
            required: true,
            minLength: 4,
            maxLength: 10,
          })}
          onChange={(e) => setStatus((e.target as HTMLSelectElement).value)}
          style={{ width: "90%", marginBottom: "1vh" }}
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
            value={appearance}
            {...register("appearance", {
              required: true,
            })}
            onChange={(e) =>
              setAppearance((e.target as HTMLTextAreaElement).value)
            }
          ></textarea>
          <textarea
            id="personality"
            placeholder="Enter personality description"
            value={personality}
            {...register("personality", {
              required: true,
            })}
            onChange={(e) =>
              setPersonality((e.target as HTMLTextAreaElement).value)
            }
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
        <select
          id="partnersArray"
          value={partnersArray}
          multiple={true}
          {...register("partnersArray")}
          onChange={arrayChange}
          style={{ width: "90%", height: "6vh", marginBottom: "1vh" }}
        >
          {(isCharactersLoading ? [...Array(2)] : characters.items).map(
            (obj: typeof characters | undefined, index: Key) =>
              !isCharactersLoading && (
                <option label={obj.fullName} value={obj._id} key={index} />
              )
          )}
        </select>
        <input
          type="file"
          id="images"
          onChange={onFileChange}
          multiple={true}
          style={{ width: "90%" }}
        />
        <input type="submit" value={isEditing ? "Update" : "Create"} />
      </FormProduct>
    </div>
  );
};

export default CharacterFormPage;
