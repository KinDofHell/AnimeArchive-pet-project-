import styles from "./Anime.module.scss";

import Search from "../components/search/Search";
import Searchbar from "../components/search/Searchbar";

const Anime = () => {
  return (
    <main className={styles.anime}>
      <div className={styles.searchblock}>
        <Search />
        <span className={styles.spanWords}>Find The Best For You</span>
        <Searchbar />
      </div>
    </main>
  );
};

export default Anime;
