import animePageStyles from "./AnimePage.module.scss";

import { SERVER_HOST } from "../../data/Constant";

import { useParams } from "react-router-dom";
import { useState, useEffect, Key } from "react";

import axios from "../../utils/axios";

import Image from "../../components/ui/Image/Image";
import AnimeInfo from "../../components/anime/animeInfo/AnimeInfo";
import Card from "../../components/ui/cards/Card";
import Button from "../../components/ui/buttons/Button";

const AnimePage = () => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<string>();

  const watched: boolean = true;

  useEffect(() => {
    axios
      .get(`/anime/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!isLoading)
    return (
      <div
        className={
          animePageStyles.anime__page + " " + animePageStyles.title__bigScreen
        }
      >
        <div className={animePageStyles.title}>
          {data.title}
          {watched ? (
            <Button
              label="Watched"
              margin="0 0 0 2%"
              backgroundColor="green"
              color="white"
            />
          ) : (
            <Button
              label="Mark as watched"
              margin="0 0 0 2%"
              backgroundColor="blue"
              color="white"
            />
          )}
        </div>
        <div className={animePageStyles.info__block}>
          <Image
            borderMode={true}
            width="70vw"
            height="24vw"
            src={SERVER_HOST + data.imgCover}
          />
          <AnimeInfo
            originalTitle={data.originTitle}
            seasonsCount={data.seasons}
            seriesCount={data.series}
            years={data.years.join(",")}
            status={data.status}
            author={data.author.fullname}
            views={data.viewsCount}
          />
        </div>
        <div className={animePageStyles.categories__block}>
          <Card
            title="Categories"
            flexColumn={true}
            flexContentColumn={false}
            contentPadding="0"
          >
            {data.categoriesArray.map((obj: any, index: Key) => (
              <Button
                key={index}
                label={obj.title}
                link={`/anime/`}
                width={`${100 - data.categoriesArray.length * 30}%`}
              />
            ))}
          </Card>
        </div>
        <div className={animePageStyles.description__block}>
          <Card title="Description" flexColumn={true} flexContentColumn={false}>
            {data.description}
          </Card>
        </div>
        <div className={animePageStyles.characters__block}></div>
        <div className={animePageStyles.additionalImgs__block}>
          {data.imgAdditional_1 && (
            <Image
              borderMode={true}
              width="70vw"
              height="40vw"
              margin="2vh 0 0 0"
              src={SERVER_HOST + data.imgAdditional_1}
            />
          )}
          {data.imgAdditional_2 && (
            <Image
              borderMode={true}
              width="70vw"
              height="40vw"
              margin="2vh 0 0 0"
              src={SERVER_HOST + data.imgAdditional_2}
            />
          )}
          {data.imgAdditional_3 && (
            <Image
              borderMode={true}
              width="70vw"
              height="40vw"
              margin="2vh 0 0 0"
              src={SERVER_HOST + data.imgAdditional_3}
            />
          )}
        </div>
      </div>
    );
  else return null;
};

export default AnimePage;
