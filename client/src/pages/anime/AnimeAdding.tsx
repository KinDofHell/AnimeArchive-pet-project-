import styles from "../../assets/stylesForAddingPages/Adding.module.scss";
import wideForm from "./AnimeAdding.module.scss";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import axios from "../../utils/axios";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import FormSelect from "../../components/ui/form/FormSelect";
import FormSelectOption from "../../components/ui/form/FormSelectOption";
import Button from "../../components/ui/buttons/Button";

const AnimeAdding = () => {
  return (
    <div className={styles.adding__page}>
      <FormContainer title="Create Anime" customStyles={wideForm.wide__form}>
        <div className={wideForm.titles__description}>
          <div className={wideForm.titles}>
            <FormField placeholder="Enter the title" type="text" />
            <FormField placeholder="Enter the origin title" type="text" />
          </div>
          <FormField
            placeholder="Enter the description"
            textarea={true}
            customStyle={wideForm.textarea}
          />
        </div>
        <span className={wideForm.hint}>Choose categories</span>
        <FormSelect multiple={true}>
          <FormSelectOption label="Action" value="action" />
          <FormSelectOption label="Romantic" value="romantic" />
        </FormSelect>
        <div className={wideForm.seasons__series__years}>
          <FormField
            placeholder="Enter the seasons count"
            type="number"
            customStyle={wideForm.inputWide}
          />
          <FormField
            placeholder="Enter the series count"
            type="number"
            customStyle={wideForm.inputWide}
          />
          <FormField
            placeholder="Enter the years of release"
            type="text"
            customStyle={wideForm.inputWide}
          />
        </div>
        <span className={wideForm.hint}>Choose status</span>
        <FormSelect>
          <FormSelectOption label="Ongoing" value="ongoing" />
          <FormSelectOption label="Finished" value="finished" />
          <FormSelectOption label="Will be soon" value="soon" />
        </FormSelect>
        <span className={wideForm.hint}>Choose author</span>
        <FormSelect>
          <FormSelectOption label="Ichigo Kurosaki" value="ichika" />
          <FormSelectOption label="Madara Uchiha" value="mada" />
        </FormSelect>
        <Button label="Create" />
      </FormContainer>
    </div>
  );
};

export default AnimeAdding;
