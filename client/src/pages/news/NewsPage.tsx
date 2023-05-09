import newsStyle from "./NewsStyle.module.scss";

import reserveImage from "../../assets/imgs/reservAva.jpg";
import LabeledContainer from "../../components/labeledContainer/LabeledContainer";
import ShortcutSpan from "../../components/shortcutSpan/ShortcutSpan";
import { useParams } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import axios from "../../utils/axios";
import { SERVER_HOST } from "../../data/Constant";

const NewsPage = () => {
  const { id } = useParams<string>();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`/news/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!isLoading) {
    return (
      <div className={newsStyle.news__page}>
        <div className={newsStyle.title}>
          <span className={newsStyle.title}>{data.title}</span>
        </div>
        <div className={newsStyle.content}>
          <div className={newsStyle.anime}>
            {data.linkedAnime.length > 0 && (
              <LabeledContainer label="Related Anime" linkPath="/anime">
                {data.linkedAnime.map(
                  (obj: typeof data.linkedAnime | undefined, index: Key) => (
                    <ShortcutSpan
                      title={obj.title}
                      linkPath={`/anime/${obj._id}`}
                      imgLink={
                        obj.images.length > 0
                          ? SERVER_HOST + obj.images[0]
                          : reserveImage
                      }
                      key={index}
                    />
                  )
                )}
              </LabeledContainer>
            )}
          </div>
          <div className={newsStyle.text}>
            {data.images.length > 0 && (
              <img
                className={newsStyle.img}
                src={SERVER_HOST + data.images}
                alt={data.title}
              />
            )}
            <div className={newsStyle.description}>{data.description}</div>
            {data.linkedCharacters.length > 0 && (
              <LabeledContainer
                label="Related Characters"
                linkPath="/characters"
              >
                {data.linkedCharacters.map(
                  (
                    obj: typeof data.linkedCharacters | undefined,
                    index: Key
                  ) => (
                    <ShortcutSpan
                      title={obj.fullName}
                      linkPath={`/character/${obj._id}`}
                      imgLink={
                        obj.images.length > 0
                          ? SERVER_HOST + obj.images[0]
                          : reserveImage
                      }
                      key={index}
                    />
                  )
                )}
              </LabeledContainer>
            )}
          </div>
          <div className={newsStyle.manga}>
            {data.linkedManga.length > 0 && (
              <LabeledContainer label="Related Manga" linkPath="/manga">
                {data.linkedManga.map(
                  (obj: typeof data.linkedManga | undefined, index: Key) => (
                    <ShortcutSpan
                      title={obj.title}
                      linkPath={`/manga/${obj._id}`}
                      imgLink={
                        obj.images.length > 0
                          ? SERVER_HOST + obj.images[0]
                          : reserveImage
                      }
                      key={index}
                    />
                  )
                )}
              </LabeledContainer>
            )}
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default NewsPage;
