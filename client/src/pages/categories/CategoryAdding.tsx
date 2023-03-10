import styles from "../../assets/stylesForAddingPages/Adding.module.scss";

import FormContainer from "../../components/ui/form/FormContainer";
import FormField from "../../components/ui/form/FormField";
import Button from "../../components/ui/buttons/Button";

const CategoryAdding = () => {
  return (
    <div className={styles.adding__page}>
      <FormContainer title={"Create Category"}>
        <FormField type={"text"} placeholder="Enter the title" />
        <FormField textarea={true} placeholder="Enter the description" />
        <Button label={"Create"} />
      </FormContainer>
    </div>
  );
};

export default CategoryAdding;
