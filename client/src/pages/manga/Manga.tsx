import animeStyle from "../anime/Anime.module.scss";
import { SERVER_HOST } from "../../data/Constant";

import { useEffect, FC, Key } from "react";

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

interface AnimeProps {
  isMyManga?: boolean;
}

const Manga: FC<AnimeProps> = ({ isMyManga }) => {
  const isAuth = useSelector(isAuthenticated);
  const { user } = useSelector((state: any) => state);
  const dispatch = useDispatch<any>();
  const { manga } = useSelector((state: any) => state.manga);
  const isMangaLoading: boolean = manga.status === "loading";

  const isProductManager = useSelector(isProductModerator);

  useEffect(() => {
    dispatch(fetchManga());
    dispatch(fetchMe());
  }, []);

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
    <div className={animeStyle.anime}>
      <div className={animeStyle.search__tools}>
        <div className={animeStyle.searchbar}>
          <Searchbar placeholder="Enter the title..." />
        </div>
        <div className={animeStyle.btn__group__tools}>
          <Button label="Categories" />
          <Button label="Statuses" />
          <Button label="Popular" />
        </div>
        {isProductManager && !isMyManga && <Button label="Add Manga" />}
      </div>
      <div className={animeStyle.content} id="content">
        {!isMangaLoading &&
          !isMyManga &&
          manga.items.map((obj: typeof manga | undefined, index: Key) => (
            <ProductCard
              title={obj.title}
              imgLink={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
              linkPath={obj._id}
              isAnime={false}
              isSelected={
                isAuth
                  ? user &&
                    user.data.ReadManga &&
                    user.data.ReadManga.includes(obj._id)
                  : false
              }
              isEditable={isProductManager}
              key={index}
            />
          ))}
        {!isMangaLoading &&
          isMyManga &&
          manga.items
            .filter(
              (item: typeof manga) =>
                user.data &&
                user.data.ReadManga &&
                user.data.ReadManga.includes(item._id)
            )
            .map((obj: typeof manga | undefined, index: Key) => (
              <ProductCard
                title={obj.title}
                imgLink={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
                linkPath={obj._id}
                isAnime={false}
                isSelected={
                  isAuth
                    ? user &&
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

export default Manga;
