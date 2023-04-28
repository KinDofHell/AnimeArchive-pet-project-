import charactersPageStyle from "./CharactersPage.module.scss";
import { SERVER_HOST } from "../../data/Constant";

import { useEffect, Key } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCharacters } from "../../redux/slices/character";

import { isProductModerator, fetchMe } from "../../redux/slices/user";

import Searchbar from "../../components/searchtools/Searchbar";
import Button from "../../components/ui copy/buttons/Button";
import CharacterContainer from "../../components/charactersContainer/CharacterContainer";

const CharactersPage = () => {
  const dispatch = useDispatch<any>();

  const { characters } = useSelector((state: any) => state.characters);

  const isProductManager = useSelector(isProductModerator);
  const isLoading: boolean = characters.status === "loading";

  useEffect(() => {
    dispatch(fetchCharacters());
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    const block = document.getElementById("content") as HTMLElement;
    let scroll: string | null = "";
    if (localStorage.getItem("scroll")) scroll = localStorage.getItem("scroll");
    const scrollNum: number = scroll ? parseInt(scroll) : 0;
    if (scrollNum) block.scrollTop = scrollNum;
    block.addEventListener("scroll", function () {
      localStorage.setItem("scroll", JSON.stringify(block.scrollTop));
    });
  }, []);

  return (
    <div className={charactersPageStyle.characters__page}>
      <div className={charactersPageStyle.searchbar}>
        <Button label="Popular" linkPath="/characters-popular" />
        <Searchbar placeholder="Enter the name of character..." />
        {isProductManager && (
          <Button label="Add Character" linkPath="/character-adding" />
        )}
      </div>
      <div className={charactersPageStyle.content} id="content">
        {!isLoading &&
          characters.items.map(
            (obj: typeof characters | undefined, index: Key) => (
              <CharacterContainer
                imgLink={obj.images[0] ? `${SERVER_HOST}${obj.images[0]}` : ""}
                linkPath={obj._id}
                fullName={obj.fullName}
                isEditing={isProductManager !== undefined && isProductManager}
                key={index}
              />
            )
          )}
      </div>
    </div>
  );
};

export default CharactersPage;
