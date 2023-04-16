import ShortcutSpanStyle from "./ShortcutSpan.module.scss";

import reservImg from "../../assets/imgs/logo.png";

import { FC } from "react";

import Button from "../ui copy/buttons/Button";

interface ShortcutSpanProps {
  imgLink?: string;
  title: string;
  linkPath: string;
  isImportant?: boolean;
  backForTitle?: boolean;
}

const ShortcutSpan: FC<ShortcutSpanProps> = ({
  imgLink,
  title,
  linkPath,
  isImportant,
  backForTitle,
}) => {
  const important: string = ShortcutSpanStyle.important;

  return (
    <div className={ShortcutSpanStyle.shortcut__span}>
      <img src={imgLink ? imgLink : reservImg} alt={imgLink} />
      <span
        className={ShortcutSpanStyle.title + " " + (isImportant && important)}
        style={backForTitle ? { backgroundColor: "rgb(18, 27, 32)" } : {}}
      >
        {title}
      </span>
      <Button
        label="Show"
        linkPath={linkPath}
        style={{ backgroundColor: "gray" }}
      />
    </div>
  );
};

export default ShortcutSpan;
