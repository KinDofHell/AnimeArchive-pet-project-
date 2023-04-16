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
  borderTopRadius,
  allBordered,
  onClick,
}) => {
  return linkPath ? (
    <Link
      to={linkPath}
      style={{
        textDecoration: "none",
        height: "auto",
        padding: "0",
        width: "fit-content",
      }}
    >
      <img
        src={imgLink ? imgLink : reservImg}
        alt={alt}
        style={
          borderTopRadius
            ? {
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }
            : allBordered
            ? {
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                borderRadius: "10px",
              }
            : { minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight }
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
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }
          : allBordered
          ? {
              minWidth: minWidth,
              maxWidth: maxWidth,
              minHeight: minHeight,
              borderRadius: "10px",
            }
          : { minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight }
      }
      onClick={onClick}
    />
  );
};

export default Image;
