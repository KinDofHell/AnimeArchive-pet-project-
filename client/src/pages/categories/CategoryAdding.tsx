import styles from "../../assets/stylesForAddingPages/Adding.module.scss";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import axios from "../../utils/axios";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import Button from "../../components/ui/buttons/Button";

const CategoryAdding = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        description,
      };
      navigate(`/anime-adding/`);
    } catch (error) {
      console.warn(error);
      alert("Error creating category");
    }
  };

  return (
    <div className={styles.adding__page}>
      <FormContainer title={"Create Category"}>
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

export default CategoryAdding;
