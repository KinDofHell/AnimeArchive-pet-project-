import productCardStyle from "./ProductCard.module.scss";

import reservImg from "../../assets/imgs/logo.png";

import { FC } from "react";
import { useDispatch } from "react-redux";

import { fetchRemoveAnime } from "../../redux/slices/anime";
import { fetchRemoveManga } from "../../redux/slices/manga";

import Image from "../ui copy/images/Image";
import Button from "../ui copy/buttons/Button";

interface ProductCardProps {
  _id: string;
  title: string;
  linkPath: string;
  isAnime: boolean;
  isMy?: boolean;
  imgLink?: string;
  isEditable?: boolean;
  isSelected?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  _id,
  title,
  isAnime,
  isMy,
  linkPath,
  imgLink,
  isEditable,
  isSelected,
}) => {
  const dispatch = useDispatch<any>();

  const onClickRemoveAnime = () => {
    if (isAnime) {
      if (window.confirm("Are you sure you want to delete anime")) {
        dispatch(fetchRemoveAnime(_id));
      }
    } else if (window.confirm("Are you sure you want to delete manga")) {
      dispatch(fetchRemoveManga(_id));
    }
  };

  return (
    <div className={productCardStyle.product__card}>
      <Image
        imgLink={imgLink ? imgLink : reservImg}
        linkPath={`/${isAnime ? "anime" : "manga"}/${linkPath}`}
        alt={title}
        minWidth="20vw"
        minHeight="12vw"
        maxWidth="20vw"
        maxHeight="12vw"
        borderTopRadius={true}
      />
      <div className={productCardStyle.info}>
        {isSelected && (
          <div
            className={productCardStyle.status}
            title={`You select it as ${isAnime ? "watched" : "read"}`}
          >
            {isAnime ? "W" : "R"}
          </div>
        )}
        <span className={productCardStyle.title}>{title}</span>
        {isEditable && (
          <div className={productCardStyle.adm__btn}>
            <Button
              label="Edit"
              linkPath={`/${isAnime ? "anime" : "manga"}/${linkPath}/edit`}
            />
            <Button
              label="Delete"
              isDanger={true}
              onClick={onClickRemoveAnime}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
