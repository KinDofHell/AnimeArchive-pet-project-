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
        <input type="submit" value="Create" />
      </FormProduct>
    </div>
  );
};

export default CharacterFormPage;
