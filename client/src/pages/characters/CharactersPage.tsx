import charactersPageStyle from "./CharactersPage.module.scss";

import { useSelector } from "react-redux";

import Searchbar from "../../components/searchtools/Searchbar";
import Button from "../../components/ui copy/buttons/Button";
import CharacterContainer from "../../components/charactersContainer/CharacterContainer";

import { isProductModerator } from "../../redux/slices/user";

const CharactersPage = () => {
  const isProductManager = useSelector(isProductModerator);

  return (
    <div className={charactersPageStyle.characters__page}>
      <div className={charactersPageStyle.searchbar}>
        <Button label="Popular" linkPath="/characters-popular" />
        <Searchbar placeholder="Enter the name of character..." />
        {isProductManager && (
          <Button label="Add Character" linkPath="/character-adding" />
        )}
      </div>
      <div className={charactersPageStyle.content}>
        <CharacterContainer
          linkPath=""
          fullName="Eren Yeager"
          title="Attack on Titan"
          isEditing={true}
        />
        <CharacterContainer
          linkPath=""
          fullName="Eren Yeager"
          title="Attack on Titan"
          isEditing={true}
        />
        <CharacterContainer
          linkPath=""
          fullName="Eren Yeager"
          title="Attack on Titan"
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default CharactersPage;
