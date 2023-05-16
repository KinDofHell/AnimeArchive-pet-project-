import productListPageStyle from "./ProductListPage.module.scss";
import { SERVER_HOST } from "../../data/Constant";

import { useEffect, FC, Key } from "react";

import { fetchAnime } from "../../redux/slices/anime";
import { fetchManga } from "../../redux/slices/manga";

import { useDispatch, useSelector } from "react-redux";

import {
  isProductModerator,
  isAuthenticated,
  fetchMe,
} from "../../redux/slices/user";

import Searchbar from "../../components/searchtools/Searchbar";
import Button from "../../components/ui copy/buttons/Button";
import ProductCard from "../../components/productCard/ProductCard";

interface ProductListPageProps {
  isMyList?: boolean;
  isAnime: boolean;
}

const ProductListPage: FC<ProductListPageProps> = ({ isMyList, isAnime }) => {
  const isAuth = useSelector(isAuthenticated);
  const { user } = useSelector((state: any) => state);
  const dispatch = useDispatch<any>();

  const { anime } = useSelector((state: any) => state.anime);

  const { manga } = useSelector((state: any) => state.manga);


  const isLoading: boolean = isAnime
    ? anime.status === "loading"
    : manga.status === "loading";

  const isProductManager = useSelector(isProductModerator);

  useEffect(() => {
    isAnime ? dispatch(fetchAnime()) : dispatch(fetchManga());
    dispatch(fetchMe());
  }, [isAnime]);

  useEffect(() => {
    const block = document.getElementById("content") as HTMLElement;
    let scroll: string | null = "";
    if (localStorage.getItem("scroll")) scroll = localStorage.getItem("scroll");
    const scrollNum: number = scroll ? parseInt(scroll) : 0;
    if (scrollNum) block.scrollTop = scrollNum;
    block.addEventListener("scroll", function () {
      localStorage.setItem("scroll", JSON.stringify(block.scrollTop));
    });
  }, []);

  return (
    <div className={productListPageStyle.product__list__page}>
      <div className={productListPageStyle.search__tools}>
        <div className={productListPageStyle.searchbar}>
          <Searchbar placeholder="Enter the title..." />
        </div>
        <div className={productListPageStyle.btn__group__tools}>
          <Button label="Categories" />
          <Button label="Statuses" />
          <Button label="Popular" />
        </div>
        {isProductManager && !isMyList && (
          <Button
            label={isAnime ? "Add Anime" : "Add Manga"}
            linkPath={isAnime ? "/anime-adding/" : "/manga-adding/"}
          />
        )}
      </div>
      <div className={productListPageStyle.content} id="content">
        {!isLoading &&
          !isMyList &&
          (isAnime ? anime.items : manga.items).map(
            (obj: typeof anime | typeof manga | undefined, index: Key) => (
              <ProductCard
                _id={obj._id}
                title={obj.title}
                imgLink={obj.images[0] ? `${SERVER_HOST}${obj.images[0]}` : ""}
                linkPath={obj._id}
                isAnime={isAnime}
                isSelected={
                  isAuth
                    ? isAnime
                      ? user &&
                        user.data.watchedAnime &&
                        user.data.watchedAnime.includes(obj._id)
                      : user &&
                        user.data.ReadManga &&
                        user.data.ReadManga.includes(obj._id)
                    : false
                }
                isEditable={isProductManager}
                key={index}
              />
            )
          )}
        {!isLoading &&
          isMyList &&
          (isAnime ? anime.items : manga.items)
            .filter((item: typeof anime | typeof manga) =>
              isAnime
                ? user.data &&
                  user.data.watchedAnime &&
                  user.data.watchedAnime.includes(item._id)
                : user.data &&
                  user.data.ReadManga &&
                  user.data.ReadManga.includes(item._id)
            )
            .map((obj: typeof anime | typeof manga | undefined, index: Key) => (
              <ProductCard
                _id={obj._id}
                title={obj.title}
                imgLink={obj.images[0] ? `${SERVER_HOST}${obj.images[0]}` : ""}
                linkPath={obj._id}
                isAnime={isAnime}
                isSelected={
                  isAuth
                    ? isAnime
                      ? user &&
                        user.data.watchedAnime &&
                        user.data.watchedAnime.includes(obj._id)
                      : user &&
                        user.data.ReadManga &&
                        user.data.ReadManga.includes(obj._id)
                    : false
                }
                isEditable={isProductManager}
                key={index}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductListPage;
