import productCardStyle from "./ProductCard.module.scss";

import reservImg from "../../assets/imgs/logo.png";

import { FC } from "react";

import Image from "../ui copy/images/Image";
import Button from "../ui copy/buttons/Button";

interface ProductCardProps {
  title: string;
  linkPath: string;
  isAnime: boolean;
  isMy?: boolean;
  imgLink?: string;
  isEditable?: boolean;
  isSelected?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  title,
  isAnime,
  isMy,
  linkPath,
  imgLink,
  isEditable,
  isSelected,
}) => {
  return (
    <div className={productCardStyle.product__card}>
      <Image
        imgLink={imgLink ? imgLink : reservImg}
        linkPath={`/${isAnime ? "anime" : "manga"}/${linkPath}`}
        alt={title}
        minWidth="100%"
        minHeight="100%"
        maxWidth="100%"
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
            <Button label="Delete" isDanger={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
