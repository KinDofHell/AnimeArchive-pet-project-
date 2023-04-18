import imageStyle from "./Image.module.scss";

import reservImg from "../../../assets/imgs/logo.png";

import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface ImageProps {
  imgLink?: string;
  alt?: string;
  linkPath?: string;
  minWidth: string;
  minHeight: string;
  maxWidth?: string;
  maxHeight?: string;
  borderTopRadius?: boolean;
  allBordered?: boolean;
  onClick?: MouseEventHandler;
}

const Image: FC<ImageProps> = ({
  imgLink,
  alt,
  linkPath,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  borderTopRadius,
  allBordered,
  onClick,
}) => {
  return linkPath ? (
    <Link to={linkPath} className={imageStyle.a}>
      <img
        src={imgLink ? imgLink : reservImg}
        alt={alt}
        style={
          borderTopRadius
            ? {
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                maxHeight: maxHeight,
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }
            : allBordered
            ? {
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                maxHeight: maxHeight,
                borderRadius: "10px",
              }
            : {
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                maxHeight: maxHeight,
              }
        }
      />
    </Link>
  ) : (
    <img
      src={imgLink ? imgLink : reservImg}
      alt={alt}
      style={
        borderTopRadius
          ? {
              minWidth: minWidth,
              maxWidth: maxWidth,
              minHeight: minHeight,
              maxHeight: maxHeight,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }
          : allBordered
          ? {
              minWidth: minWidth,
              maxWidth: maxWidth,
              minHeight: minHeight,
              maxHeight: maxHeight,
              borderRadius: "10px",
            }
          : {
              minWidth: minWidth,
              maxWidth: maxWidth,
              minHeight: minHeight,
              maxHeight: maxHeight,
            }
      }
      onClick={onClick}
    />
  );
};

export default Image;
