import homeStyle from "./Home.module.scss";
import { SERVER_HOST } from "../../data/Constant";

import { useEffect, Key } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecentAnime } from "../../redux/slices/anime";
import { fetchRecentManga } from "../../redux/slices/manga";
import { fetchRecentNews } from "../../redux/slices/news";
import { fetchPopularCharacter } from "../../redux/slices/character";

import LabeledContainer from "../../components/labeledContainer/LabeledContainer";
import ShortcutSpan from "../../components/shortcutSpan/ShortcutSpan";
import Image from "../../components/ui copy/images/Image";

const Home = () => {
  const dispatch = useDispatch<any>();
  const { anime } = useSelector((state: any) => state.anime);
  const { manga } = useSelector((state: any) => state.manga);
  const { news } = useSelector((state: any) => state.news);
  const { characters } = useSelector((state: any) => state.characters);
  const isAnimeLoading: boolean = anime.status === "loading";
  const isMangaLoading: boolean = manga.status === "loading";
  const isNewsLoading: boolean = news.status === "loading";
  const isCharacterLoading: boolean = characters.status === "loading";

  useEffect(() => {
    dispatch(fetchRecentAnime());
    dispatch(fetchRecentManga());
    dispatch(fetchRecentNews());
    dispatch(fetchPopularCharacter());
  }, []);

  return (
    <div className={homeStyle.home}>
      <div className={homeStyle.about__us}>?</div>
      <div className={homeStyle.messengers}>!</div>
      <div className={homeStyle.notes}>
        <div>Hello</div>
      </div>
      <div className={homeStyle.info}>
        <div className={homeStyle.recent + " inner-page-section"}>
          <LabeledContainer label="Recent Anime" linkPath="/anime/">
            {!isAnimeLoading &&
              anime.items.map((obj: typeof anime | undefined, index: Key) => (
                <ShortcutSpan
                  title={obj.title}
                  imgLink={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
                  linkPath={`/anime/${obj._id}`}
                  key={index}
                />
              ))}
            {isAnimeLoading && (
              <ShortcutSpan title="Attack on Titan" linkPath="/anime/" />
            )}
          </LabeledContainer>
          <LabeledContainer label="Recent Manga" linkPath="/manga/">
            {!isMangaLoading &&
              manga.items.map((obj: typeof manga | undefined, index: Key) => (
                <ShortcutSpan
                  title={obj.title}
                  imgLink={obj.imgCover ? `${SERVER_HOST}${obj.imgCover}` : ""}
                  linkPath={`/manga/${obj._id}`}
                  key={index}
                />
              ))}
            {isMangaLoading && (
              <ShortcutSpan title="Attack on Titan" linkPath="/anime/" />
            )}
          </LabeledContainer>
        </div>
        <div className={homeStyle.popular + " inner-page-section"}>
          <LabeledContainer
            label="The Most Popular Character"
            linkPath="/characters/"
          >
            {!isCharacterLoading &&
              characters.items.map(
                (obj: typeof characters | undefined, index: Key) => (
                  <ShortcutSpan
                    title={obj.fullName}
                    imgLink={
                      obj.images[0] ? `${SERVER_HOST}${obj.images[0]}` : ""
                    }
                    linkPath={`/character/${obj._id}`}
                    key={index}
                  />
                )
              )}
            {isCharacterLoading && (
              <ShortcutSpan title="Madara Uchiha" linkPath="/characters/" />
            )}
          </LabeledContainer>
          <LabeledContainer label="The Most Popular Image" linkPath="/gallery/">
            <Image
              imgLink="https://i.pinimg.com/originals/38/89/1d/38891d63301e957da6fc19b732a09caf.jpg"
              linkPath="/gallery/"
              width="15vw"
              height="10vw"
            />
          </LabeledContainer>
        </div>
      </div>
      <div className={homeStyle.social}>
        <LabeledContainer
          label="Latest News"
          linkPath="/news/"
          attractiveTitle={true}
        >
          {!isNewsLoading &&
            news.items.map((obj: typeof news | undefined, index: Key) => (
              <ShortcutSpan
                title={obj.title}
                imgLink={obj.images[0] ? `${SERVER_HOST}${obj.images[0]}` : ""}
                linkPath={`/news/${obj._id}`}
                isImportant={obj.isImportant}
                key={index}
              />
            ))}
          {isNewsLoading && (
            <ShortcutSpan title="Summer is comming..." linkPath="/news/" />
          )}
        </LabeledContainer>
      </div>
    </div>
  );
};

export default Home;
