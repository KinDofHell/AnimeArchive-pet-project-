import animePageStyles from "./AnimePage.module.scss";

import Image from "../../components/ui/Image/Image";
import AnimeInfo from "../../components/anime/animeInfo/AnimeInfo";
import Card from "../../components/ui/cards/Card";
import Button from "../../components/ui/buttons/Button";

const AnimePage = () => {
  return (
    <div
      className={
        animePageStyles.anime__page + " " + animePageStyles.title__bigScreen
      }
    >
      <div className={animePageStyles.title}>Attack on Titan</div>
      <div className={animePageStyles.info__block}>
        <Image borderMode={true} width="70vw" height="24vw" />
        <AnimeInfo
          originalTitle="h"
          seasonsCount={3}
          seriesCount={100}
          years="2016, 2022"
          status="Ongoing"
          author="Isayama Isayama"
          views={300}
        />
      </div>
      <div className={animePageStyles.categories__block}>
        <Card
          title="Categories"
          flexColumn={true}
          flexContentColumn={false}
          contentPadding="0"
        >
          <Button label="Action" />
          <Button label="Action" />
          <Button label="Action" />
          <Button label="Action" />
          <Button label="Action" />
          <Button label="Action" />
          <Button label="Action" />
        </Card>
      </div>
      <div className={animePageStyles.additionalImgs__block}></div>
      <div className={animePageStyles.description__block}></div>
      <div className={animePageStyles.characters__block}></div>
    </div>
  );
};

export default AnimePage;
