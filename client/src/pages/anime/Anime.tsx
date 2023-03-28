import styles from "./Anime.module.scss";

import { SERVER_HOST } from "../../data/Constant";

import { Key, useEffect } from "react";

import { fetchAnime } from "../../redux/slices/anime";
import { useDispatch, useSelector } from "react-redux";
import { isProductModerator } from "../../redux/slices/user";

import Search from "../../components/search/Search";
import Searchbar from "../../components/search/Searchbar";
import AnimeItem from "../../components/anime/animeItem/AnimeItem";
import Button from "../../components/ui/buttons/Button";

const Anime = () => {
  const dispatch = useDispatch<any>();
  const { anime } = useSelector((state: any) => state.anime);
  const isAnimeLoading: boolean = anime.status === "loading";

  const isProductManager = useSelector(isProductModerator);

  useEffect(() => {
    dispatch(fetchAnime());
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
        <Search />
        {isProductManager ? (
          <Button
            label="Add New One"
            link="/anime-adding"
            customStyle={styles.spanWords}
          />
        ) : (
          <span className={styles.spanWords}>Find The Best For You</span>
        )}
        <Searchbar />
      </div>
      <div className={styles.anime__content} id="content">
        {!isAnimeLoading &&
          anime.items.map((obj: typeof anime | undefined, index: Key) => (
            <AnimeItem
              _id={obj._id}
              key={index}
              title={obj.title}
              image={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
              isEditable={isProductManager}
              isWatched={true}
            />
          ))}
      </div>
    </main>
  );
};

export default Anime;
