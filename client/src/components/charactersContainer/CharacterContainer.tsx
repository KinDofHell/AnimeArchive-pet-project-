import charactersContainerStyle from "./CharacterContainer.module.scss";

import { FC } from "react";
import { useDispatch } from "react-redux";

import { fetchRemoveCharacter } from "../../redux/slices/character";

import Button from "../ui copy/buttons/Button";
import Image from "../ui copy/images/Image";

interface CharacterContainerProps {
  _id: string;
  imgLink?: string;
  fullName: string;
  isEditing: boolean;
  linkPath: string;
}

const CharacterContainer: FC<CharacterContainerProps> = ({
  _id,
  imgLink,
  fullName,
  isEditing,
  linkPath,
}) => {
  const dispatch = useDispatch<any>();

  const onClickRemoveCharacter = () => {
    if (window.confirm("Are you sure you want to delete character")) {
      dispatch(fetchRemoveCharacter(_id));
    }
  };

  return (
    <div className={charactersContainerStyle.characters__container}>
      {isEditing && (
        <div className={charactersContainerStyle.moderatorBtn}>
          <Button label="Edit" linkPath={`/character/${linkPath}/edit`} />
          <Button
            label="Delete"
            isDanger={true}
            onClick={onClickRemoveCharacter}
          />
        </div>
      )}
      <div className={charactersContainerStyle.info}>
        <Image classes={charactersContainerStyle.img} imgLink={imgLink} />
        <span>{fullName}</span>
        <Button label="Show" linkPath={`/character/${linkPath}`} />
      </div>
    </div>
  );
};

export default CharacterContainer;
