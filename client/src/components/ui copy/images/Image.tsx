import imageStyle from "./Image.module.scss";

import reservImg from "../../../assets/imgs/logo.png";

import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface ImageProps {
  imgLink?: string;
  alt?: string;
  linkPath?: string;
  width: string;
  height: string;
  borderTopRadius?: boolean;
  allBordered?: boolean;
  onClick?: MouseEventHandler;
}

const Image: FC<ImageProps> = ({
  imgLink,
  alt,
  linkPath,
  width,
  height,
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
                width: width,
                height: height,
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }
            : allBordered
            ? {
                width: width,
                height: height,
                borderRadius: "10px",
              }
            : {
                width: width,
                height: height,
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
              width: width,
              height: height,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }
          : allBordered
          ? {
              width: width,
              height: height,
              borderRadius: "10px",
            }
          : {
              width: width,
              height: height,
            }
      }
      onClick={onClick}
    />
  );
};

export default Image;
