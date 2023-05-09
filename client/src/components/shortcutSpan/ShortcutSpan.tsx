import ShortcutSpanStyle from "./ShortcutSpan.module.scss";

import reserveImg from "../../assets/imgs/reservAva.jpg";

import { FC, HTMLAttributes } from "react";

import Button from "../ui copy/buttons/Button";

interface ShortcutSpanProps extends HTMLAttributes<HTMLDivElement> {
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
      <img src={imgLink ? imgLink : reserveImg} alt={imgLink} />
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
