import imgStyles from "./Image.module.scss";
import imgNotFound from "../../../assets/imgs/worker-anime-error-404-page-not-found_150972-701.avif";

import { FC, MouseEventHandler } from "react";

import { Link } from "react-router-dom";

interface Props {
  src?: string;
  linkPath?: string;
  borderMode?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  onClick?: MouseEventHandler;
}

const Image: FC<Props> = ({
  src,
  linkPath,
  borderMode,
  width,
  height,
  margin,
  onClick,
}) => {
  return linkPath ? (
    <Link to={linkPath}>
      <img
        src={src ? src : imgNotFound}
        alt={src ? src : "not found"}
        className={
          imgStyles.image + " " + (borderMode && imgStyles.image__blur_border)
        }
        style={{ width: width, height: height, margin: margin }}
        onClick={onClick}
      />
    </Link>
  ) : (
    <img
      src={src ? src : imgNotFound}
      alt={src ? src : "not found"}
      className={
        imgStyles.image + " " + (borderMode && imgStyles.image__blur_border)
      }
      style={{ width: width, height: height, margin: margin }}
      onClick={onClick}
    />
  );
};

export default Image;
