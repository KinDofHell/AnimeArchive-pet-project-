import styles from "../../assets/stylesForAddingPages/Adding.module.scss";

import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "../../utils/axios";
import { isAuthenticated, isProductModerator } from "../../redux/slices/user";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import Button from "../../components/ui/buttons/Button";

const CreatorAdding = () => {
  const isAuth = useSelector(isAuthenticated);
  const isPM = useSelector(isProductModerator);

  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImgUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error uploading");
    }
  };

  const onClickRemoveImage = () => {
    setImgUrl("");
  };

  const onSubmit = async () => {
    try {
      const fields = {
        fullname,
        description,
        imgUrl,
      };
      await axios.post("/creator", fields);
      navigate(`/anime-adding/`);
    } catch (error) {
      console.warn(error);
      alert("Error creating creator");
    }
  };

  const onButtonCliclImage = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isPM && isPM !== undefined) return <Navigate to="/" />;

  return (
    <div className={styles.adding__page}>
      <FormContainer title={"Add Creators"}>
        {imgUrl && (
          <>
            <img src={`http://localhost:4000${imgUrl}`} alt="uploaded" />
          </>
        )}
        <FormField
          type={"text"}
          value={fullname}
          placeholder="Enter the fullname"
          onChange={(e) => setFullname((e.target as HTMLInputElement).value)}
        />
        <FormField
          textarea={true}
          value={description}
          placeholder="Enter the description"
          onChange={(e) =>
            setDescription((e.target as HTMLTextAreaElement).value)
          }
        />
        <input
          type="file"
          ref={inputFileRef}
          hidden={true}
          onChange={handleChangeFile}
        />
        <Button label={"Load Image"} onClick={onButtonCliclImage} />
        <Button label={"Remove Image"} onClick={onClickRemoveImage} />
        <Button label={"Add"} onClick={onSubmit} />
      </FormContainer>
    </div>
  );
};

export default CreatorAdding;
