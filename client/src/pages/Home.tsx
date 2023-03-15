import styles from "./Home.module.scss";
import centralImgs from "../assets/imgs/NicePng_twitter-circle-png_3529605.png";
import aboutImg from "../assets/imgs/anime-question.gif";

import {
  FaInstagram,
  FaTelegram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/Fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import { useEffect, Key } from "react";
import { fetchRecentAnime } from "../redux/slices/anime";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/ui/card/Card";
import RecAnimeItems from "./../components/recentlyAnimeItems/RecAnimeItems";
import IconContainer from "../components/ui/iconContainer/IconContainer";
import Image from "../components/ui/Image/Image";

const Home = () => {
  const dispatch = useDispatch<any>();
  const { anime } = useSelector((state: any) => state.anime);
  const isAnimeLoading: boolean = anime.status === "loading";

  useEffect(() => {
    dispatch(fetchRecentAnime());
  }, []);

  return (
    <main className={styles.home}>
      <div className={styles.top__block}>
        <Card title="Recently Added Anime">
          {(isAnimeLoading ? [...Array(3)] : anime.items).map(
            (obj: typeof anime | undefined, index: Key) =>
              isAnimeLoading ? (
                <RecAnimeItems
                  title={"Naruto"}
                  img={""}
                  link={"/anime/"}
                  key={index}
                />
              ) : (
                <RecAnimeItems
                  title={obj.title}
                  img={obj.imgCover}
                  link={`/anime/${obj._id}`}
                  key={index}
                />
              )
          )}
        </Card>
        <img className={styles.img} src={centralImgs} alt={centralImgs} />
        <Card title="Recently Added News">
          <RecAnimeItems title={"Holidays Event"} img={""} link={"/news/"} />
          <RecAnimeItems
            title={"Back to Death Note"}
            img={""}
            link={"/news/"}
          />
          <RecAnimeItems title={"Mikasa Ackerman"} img={""} link={"/news/"} />
        </Card>
      </div>
      <div className={styles.bottom__block}>
        <Card title="New Image" customStyleCard={styles.card__width__side}>
          <Image
            src="https://img.freepik.com/premium-photo/cute-anime-woman-looking-cityscape-by-night-time-sad-moody-manga-lofi-style-3d-rendering_717906-997.jpg"
            linkPath={"/gallery/"}
          />
        </Card>
        <Card
          title="Additional Info"
          customStyleCard={styles.card__width}
          customStyleContent={styles.addtional__info}
          customStyleTitle={styles.title__img}
        >
          <IconContainer
            size={"100%"}
            color={"darkred"}
            customIcon={styles.icon__hover}
            link={"#"}
          >
            {<FaInstagram />}
          </IconContainer>
          <IconContainer
            size={"100%"}
            color={"rgb(0, 89, 255)"}
            customIcon={styles.icon__hover}
            link={"#"}
          >
            {<FaTelegram />}
          </IconContainer>
          <IconContainer
            size={"100%"}
            color={"rgb(0, 89, 255)"}
            customIcon={styles.icon__hover}
            link={"#"}
          >
            {<FaFacebook />}
          </IconContainer>
          <IconContainer
            size={"100%"}
            color={"green"}
            customIcon={styles.icon__hover}
            link={"#"}
          >
            {<FaWhatsapp />}
          </IconContainer>
          <IconContainer
            size={"100%"}
            color={"black"}
            customIcon={styles.icon__hover}
            link={"#"}
          >
            {<HiOutlineChatBubbleOvalLeftEllipsis />}
          </IconContainer>
        </Card>
        <Card title="About Us" customStyleCard={styles.card__width__side}>
          <Image src={aboutImg} linkPath={"/about-us"} />
        </Card>
      </div>
    </main>
  );
};

export default Home;
