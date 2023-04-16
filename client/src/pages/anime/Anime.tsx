import animeStyle from "./Anime.module.scss";
import { SERVER_HOST } from "../../data/Constant";

import { useEffect, FC, Key } from "react";

import { fetchAnime } from "../../redux/slices/anime";
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
  isMyAnime?: boolean;
}

const Anime: FC<AnimeProps> = ({ isMyAnime }) => {
  const isAuth = useSelector(isAuthenticated);
  const { user } = useSelector((state: any) => state);
  const dispatch = useDispatch<any>();
  const { anime } = useSelector((state: any) => state.anime);
  const isAnimeLoading: boolean = anime.status === "loading";

  const isProductManager = useSelector(isProductModerator);

  useEffect(() => {
    dispatch(fetchAnime());
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
        {isProductManager && !isMyAnime && <Button label="Add Anime" />}
      </div>
      <div className={animeStyle.content} id="content">
        {!isAnimeLoading &&
          !isMyAnime &&
          anime.items.map((obj: typeof anime | undefined, index: Key) => (
            <ProductCard
              title={obj.title}
              imgLink={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
              linkPath={obj._id}
              isAnime={true}
              isSelected={
                isAuth
                  ? user &&
                    user.data.watchedAnime &&
                    user.data.watchedAnime.includes(obj._id)
                  : false
              }
              isEditable={isProductManager}
              key={index}
            />
          ))}
        {!isAnimeLoading &&
          isMyAnime &&
          anime.items
            .filter(
              (item: typeof anime) =>
                user.data &&
                user.data.watchedAnime &&
                user.data.watchedAnime.includes(item._id)
            )
            .map((obj: typeof anime | undefined, index: Key) => (
              <ProductCard
                title={obj.title}
                imgLink={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
                linkPath={obj._id}
                isAnime={true}
                isSelected={
                  isAuth
                    ? user &&
                      user.data.watchedAnime &&
                      user.data.watchedAnime.includes(obj._id)
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

export default Anime;
