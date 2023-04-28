import imageStyle from "./Image.module.scss";

import reservImg from "../../../assets/imgs/logo.png";

import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface ImageProps {
  imgLink?: string;
  alt?: string;
  linkPath?: string;
  classes?: string;
  onClick?: MouseEventHandler;
}

const Image: FC<ImageProps> = ({
  imgLink,
  alt,
  linkPath,
  classes,
  onClick,
}) => {
  return linkPath ? (
    <Link to={linkPath} className={imageStyle.a}>
      <img
        src={imgLink ? imgLink : reservImg}
        alt={alt}
        className={imageStyle.img + " " + classes}
      />
    </Link>
  ) : (
    <img
      src={imgLink ? imgLink : reservImg}
      alt={alt}
      onClick={onClick}
      className={imageStyle.img + " " + classes}
    />
  );
};

export default Image;
