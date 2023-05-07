import newsStyle from "./NewsStyle.module.scss";

import reserveImage from "../../assets/imgs/reservAva.jpg";
import LabeledContainer from "../../components/labeledContainer/LabeledContainer";
import ShortcutSpan from "../../components/shortcutSpan/ShortcutSpan";

const NewsPage = () => {
  return (
    <div className={newsStyle.news__page}>
      <div className={newsStyle.images__title}>
        <img src={reserveImage} alt="" />
        <span className={newsStyle.title}>Title</span>
      </div>
      <div className={newsStyle.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        architecto autem dolorum eius eveniet expedita facilis fugit hic
        inventore iusto laborum maiores, minus nobis nostrum odio perferendis
        possimus praesentium quia repellendus reprehenderit rerum sequi sit sunt
        suscipit, tempore tenetur unde vitae. Accusantium architecto aspernatur
        cumque cupiditate distinctio ea eius eos eum facere illum in itaque
        laboriosam libero neque nobis obcaecati odio officiis porro quaerat
        quibusdam quidem quos reiciendis, repellendus sequi ullam ut voluptatem.
        Accusantium alias assumenda cum deleniti distinctio ducimus, eum officia
        placeat praesentium quis quo rem rerum, velit, voluptatibus!
      </div>
      <div className={newsStyle.related}>
        <LabeledContainer label="Related Characters" linkPath="/characters">
          <ShortcutSpan
            title="Naruto Uzumaki"
            linkPath="/character"
            imgLink={reserveImage}
          />
        </LabeledContainer>
        <LabeledContainer label="Related Anime" linkPath="/anime">
          <ShortcutSpan
            title="Naruto"
            linkPath="/anime"
            imgLink={reserveImage}
          />
        </LabeledContainer>
        <LabeledContainer label="Related Manga" linkPath="/manga">
          <ShortcutSpan
            title="Naruto"
            linkPath="/manga"
            imgLink={reserveImage}
          />
        </LabeledContainer>
      </div>
    </div>
  );
};

export default NewsPage;
