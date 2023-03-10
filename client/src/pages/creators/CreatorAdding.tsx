import styles from "../../assets/stylesForAddingPages/Adding.module.scss";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import Button from "../../components/ui/buttons/Button";

const CreatorAdding = () => {
  return (
    <div className={styles.adding__page}>
      <FormContainer title={"Add Creators"}>
        <FormField type={"text"} placeholder="Enter the fullname" />
        <FormField textarea={true} placeholder="Enter the description" />
        <FormField
          type={"file"}
          placeholder="Enter the fullname"
          hidden={true}
        />
        <Button label={"Load Image"} />
        <Button label={"Add"} />
      </FormContainer>
    </div>
  );
};

export default CreatorAdding;
