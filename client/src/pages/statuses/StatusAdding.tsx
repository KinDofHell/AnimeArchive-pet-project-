import styles from "../../assets/stylesForAddingPages/Adding.module.scss";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "../../utils/axios";
import { isAuthenticated, isProductModerator } from "../../redux/slices/user";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import Button from "../../components/ui copy/buttons/Button";

const StatusAdding = () => {
  const isAuth = useSelector(isAuthenticated);
  const isPM = useSelector(isProductModerator);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        description,
      };
      await axios.post("/status", fields);
      navigate(`/anime-adding/`);
    } catch (error) {
      console.warn(error);
      alert("Error creating status");
    }
  };

  if (!isAuth && !window.localStorage.getItem("token"))
    return <Navigate to="/" />;
  if (!isPM && isPM !== undefined) return <Navigate to="/" />;

  return (
    <div className={styles.adding__page}>
      <FormContainer title={"Create Status"}>
        <FormField
          type={"text"}
          value={title}
          placeholder="Enter the title"
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />
        <FormField
          textarea={true}
          value={description}
          placeholder="Enter the description"
          onChange={(e) =>
            setDescription((e.target as HTMLTextAreaElement).value)
          }
        />
        <Button label={"Create"} onClick={onSubmit} />
      </FormContainer>
    </div>
  );
};

export default StatusAdding;
