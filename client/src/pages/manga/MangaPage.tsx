import animePageStyles from "../anime/AnimePage.module.scss";

import { SERVER_HOST } from "../../data/Constant";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, Key } from "react";

import axios from "../../utils/axios";

import { isAuthenticated } from "../../redux/slices/user";

import Image from "../../components/ui/Image/Image";
import AnimeInfo from "../../components/anime/animeInfo/AnimeInfo";
import Card from "../../components/ui/cards/Card";
import Button from "../../components/ui/buttons/Button";

const MangaPage = () => {
  const isAuth = useSelector(isAuthenticated);
  const { user } = useSelector((state: any) => state);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<string>();

  const [watched, setWatched] = useState<boolean>(
    isAuth && user.data.ReadManga.includes(id)
  );

  const onClickAdd = async () => {
    try {
      const fields = {
        ReadManga: id,
      };
      await axios.patch("/user", fields);
      setWatched(true);
    } catch (error) {
      alert("Error marking manga");
      console.warn(error);
    }
  };
  const onClickRemove = async () => {
    try {
      const fields = {
        ReadManga: id,
      };
      await axios.patch("/watched-list", fields);
      setWatched(false);
    } catch (error) {
      alert("Error marking manga");
      console.warn(error);
    }
  };

  useEffect(() => {
    axios
      .get(`/manga/${id}`)
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
              label="Read"
              margin="0 0 0 2%"
              backgroundColor="green"
              color="white"
              onClick={onClickRemove}
            />
          ) : (
            isAuth && (
              <Button
                label="Mark as read"
                margin="0 0 0 2%"
                backgroundColor="blue"
                color="white"
                onClick={onClickAdd}
              />
            )
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
            chaptersCount={data.chapters}
            years={data.years.join(",")}
            status={data.status.title}
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
                link={`/manga/`}
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

export default MangaPage;
