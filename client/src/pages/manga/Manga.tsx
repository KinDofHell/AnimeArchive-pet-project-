import styles from "../anime/Anime.module.scss";

import { SERVER_HOST } from "../../data/Constant";

import { Key, useEffect } from "react";

import { fetchManga } from "../../redux/slices/manga";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  isProductModerator,
  isAuthenticated,
  fetchMe,
} from "../../redux/slices/user";

import Search from "../../components/search/Search";
import Searchbar from "../../components/search/Searchbar";
import AnimeItem from "../../components/anime/animeItem/AnimeItem";
import Button from "../../components/ui/buttons/Button";

const Manga = ({ isMyManga }: { isMyManga: boolean }) => {
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
    <main className={styles.anime}>
      <div className={styles.searchblock}>
        <Search typeProduct="manga" />
        {isProductManager ? (
          <Button
            label="Add New One"
            link="/manga-adding"
            customStyle={styles.spanWords}
          />
        ) : (
          <span className={styles.spanWords}>Find The Best For You</span>
        )}
        <Searchbar />
      </div>
      <div className={styles.anime__content} id="content">
        {!isMangaLoading &&
          !isMyManga &&
          manga.items.map((obj: typeof manga | undefined, index: Key) => (
            <AnimeItem
              _id={obj._id}
              key={index}
              type="manga"
              title={obj.title}
              image={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
              isEditable={isProductManager}
              isWatched={
                isAuth ? user && user.data.ReadManga.includes(obj._id) : false
              }
            />
          ))}
        {!isMangaLoading &&
          isMyManga &&
          user.data &&
          manga.items
            .filter(
              (item: typeof manga) =>
                user.data.ReadManga &&
                user &&
                user.data.ReadManga.includes(item._id)
            )
            .map((obj: typeof manga | undefined, index: Key) => (
              <AnimeItem
                _id={obj._id}
                key={index}
                type="manga"
                title={obj.title}
                image={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
                isEditable={isProductManager}
                isWatched={
                  isAuth ? user && user.data.ReadManga.includes(obj._id) : false
                }
              />
            ))}
        {!isAuth && isMyManga && (
          <Button label="Log In Please" link="/login" fontSize="3vw" />
        )}
      </div>
    </main>
  );
};

export default Manga;
