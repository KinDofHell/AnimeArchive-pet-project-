import styles from "./Home.module.scss";
import centralImgs from "../assets/imgs/NicePng_twitter-circle-png_3529605.png";

import {
  FaInstagram,
  FaTelegram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/Fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import Card from "../components/card/Card";
import RecAnimeItems from "./../components/recentlyAnimeItems/RecAnimeItems";
import IconContainer from "../components/iconContainer/IconContainer";
import Image from "../components/Image/Image";

const Home = () => {
  return (
    <main className={styles.home}>
      <div className={styles.top__block}>
        <Card title="Recently Added Anime">
          <RecAnimeItems title={"Naruto"} img={""} link={"/anime/"} />
          <RecAnimeItems title={"Bleach"} img={""} link={"/anime/"} />
          <RecAnimeItems title={"Attack on Titans"} img={""} link={"/anime/"} />
        </Card>
        <img className={styles.img} src={centralImgs} alt={centralImgs} />
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
          <Image
            src="https://media.tenor.com/TTagN58VhFYAAAAC/anime-question.gif"
            linkPath={"/about-us"}
          />
        </Card>
      </div>
    </main>
  );
};

export default Home;
