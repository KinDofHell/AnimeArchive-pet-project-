import charactersContainerStyle from "./CharacterContainer.module.scss";

import { FC } from "react";

import Button from "../ui copy/buttons/Button";
import Image from "../ui copy/images/Image";

interface CharacterContainerProps {
  imgLink?: string;
  fullName: string;
  title?: string;
  isEditing: boolean;
  linkPath: string;
}

const CharacterContainer: FC<CharacterContainerProps> = ({
  imgLink,
  fullName,
  title,
  isEditing,
  linkPath,
}) => {
  return (
    <div className={charactersContainerStyle.characters__container}>
      {isEditing && (
        <div className={charactersContainerStyle.moderatorBtn}>
          <Button label="Edit" linkPath={`/character/${linkPath}/edit`} />
          <Button label="Delete" isDanger={true} />
        </div>
      )}
      <div className={charactersContainerStyle.info}>
        <Image height="5vw" width="5vw" />
        <span>{fullName}</span>
        {title && <span>{title}</span>}
        <Button label="Show" linkPath={`/character/${linkPath}`} />
      </div>
    </div>
  );
};

export default CharacterContainer;
