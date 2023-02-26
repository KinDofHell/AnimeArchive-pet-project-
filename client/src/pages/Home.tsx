import styles from "./Home.module.scss";

import Card from "../components/card/Card";
import RecAnimeItems from "./../components/recentlyAnimeItems/RecAnimeItems";

const Home = () => {
  return (
    <main className={styles.home}>
      <div className={styles.top__block}>
        <Card title="Recently Added">
          <RecAnimeItems title={"Naruto"} img={""} link={"/anime/"} />
          <RecAnimeItems title={"Bleach"} img={""} link={"/anime/"} />
          <RecAnimeItems title={"Attack on Titans"} img={""} link={"/anime/"} />
        </Card>
        <Card title="Recently Added News">
          <RecAnimeItems title={"Holidays Event"} img={""} link={"/news/"} />
          <RecAnimeItems
            title={"Back to Death Note"}
            img={""}
            link={"/news/"}
          />
          <RecAnimeItems title={"Mikasa Akkerman"} img={""} link={"/news/"} />
        </Card>
      </div>
      <div className={styles.bottom__block}></div>
    </main>
  );
};

export default Home;
