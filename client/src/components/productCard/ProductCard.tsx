import productCardStyle from "./ProductCard.module.scss";

import reservImg from "../../../../../Master React/public/logo.png";

import { FC } from "react";
import { useDispatch } from "react-redux";

import { fetchRemoveAnime } from "../../redux/slices/anime";
import { fetchRemoveManga } from "../../redux/slices/manga";

import Image from "../ui copy/images/Image";
import Button from "../ui copy/buttons/Button";
import { fetchRemoveNews } from "../../redux/slices/news";

interface ProductCardProps {
  _id: string;
  title: string;
  linkPath: string;
  isAnime: boolean;
  isNews?: boolean;
  imgLink?: string;
  isEditable?: boolean;
  isSelected?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  _id,
  title,
  isAnime,
  isNews,
  linkPath,
  imgLink,
  isEditable,
  isSelected,
}) => {
  const dispatch = useDispatch<any>();

  const onClickRemoveAnime = () => {
    if (isAnime) {
      if (window.confirm("Are you sure you want to delete anime"))
        dispatch(fetchRemoveAnime(_id));
    } else if (!isNews) {
      if (window.confirm("Are you sure you want to delete manga"))
        dispatch(fetchRemoveManga(_id));
    } else if (isNews)
      if (window.confirm("Are you sure you want to delete manga"))
        dispatch(fetchRemoveNews(_id));
  };

  return (
    <div className={productCardStyle.product__card}>
      <Image
        imgLink={imgLink ? imgLink : reservImg}
        linkPath={`/${
          isAnime ? "anime" : isNews ? "news" : "manga"
        }/${linkPath}`}
        alt={title}
        classes={productCardStyle.img}
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
              linkPath={`/${
                isAnime ? "anime" : isNews ? "news" : "manga"
              }/${linkPath}/edit`}
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
