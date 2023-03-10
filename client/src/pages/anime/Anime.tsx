import styles from "./Anime.module.scss";

import { useEffect } from "react";
import { Link } from "react-router-dom";

import Search from "../../components/search/Search";
import Searchbar from "../../components/search/Searchbar";
import AnimeItem from "../../components/animeItem/AnimeItem";
import Button from "../../components/ui/buttons/Button";

const Anime = () => {
  const isAdmin = false;

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
        {isAdmin ? (
          <Link to="/anime-adding">
            <Button label={"Add Anime"} />
          </Link>
        ) : (
          <span className={styles.spanWords}>Find The Best For You</span>
        )}
        <Searchbar />
      </div>
      <div className={styles.anime__content} id="content">
        {[...Array(12)].map((obj, index) => (
          <AnimeItem
            title="Attack on Titan"
            image={
              "https://cdn.oneesports.gg/cdn-data/2022/04/AttackOnTitan_Season4Part2_Historia.webp"
            }
            key={index}
            isEditable={true}
            isWatched={false}
          />
        ))}
      </div>
    </main>
  );
};

export default Anime;
