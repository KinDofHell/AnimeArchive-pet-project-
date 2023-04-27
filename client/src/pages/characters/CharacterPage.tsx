import characterPageStyle from "./CharacterPage.module.scss";
import reservImg from "../../assets/imgs/logo.png";

import Image from "../../components/ui copy/images/Image";
import NameValueSpan from "../../components/nameValueSpan/NameValueSpan";
import LabeledContainer from "../../components/labeledContainer/LabeledContainer";
import ShortcutSpan from "../../components/shortcutSpan/ShortcutSpan";

const CharacterPage = () => {
  return (
    <div className={characterPageStyle.character__page}>
      <div className={characterPageStyle.left__bar}>
        <Image imgLink={reservImg} height="12vw" width="12vw" />
        <span className={characterPageStyle.name}>Naruto Uzumaki</span>
        <div className={characterPageStyle.info}>
          <NameValueSpan name="Age" value={30} minWidth="100%" />
          <NameValueSpan name="Sex" value="Male" minWidth="100%" />
          <NameValueSpan name="Race" value="Human" minWidth="100%" />
          <NameValueSpan
            name="Status"
            value="Alive"
            minWidth="100%"
            isHidden={true}
          />
        </div>
        <LabeledContainer label="Partners">
          <ShortcutSpan title="Minato Namikaze" linkPath="/character/" />
          <ShortcutSpan title="Minato Namikaze" linkPath="/character/" />
          <ShortcutSpan title="Minato Namikaze" linkPath="/character/" />
        </LabeledContainer>
      </div>
      <div className={characterPageStyle.right__bar}>
        <div className={characterPageStyle.appearance}>
          <span>Appearance</span>
          <div className={characterPageStyle.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            eius asperiores placeat deleniti rem in tempore odit officia culpa?
            In rerum quis natus error. Dolorum culpa ipsa ipsum. Molestiae,
            consectetur! Voluptates, autem porro quia nesciunt non distinctio,
            iste illum, voluptatem laudantium molestiae minima in optio nulla?
            Saepe aliquid, explicabo reprehenderit labore veritatis quis odit
            placeat unde commodi quaerat magni facilis? Beatae ab ratione enim
            magnam molestias numquam. Placeat atque id voluptatibus ea?
            Doloribus corrupti debitis praesentium ullam aspernatur soluta
            libero. Odio amet alias voluptates repellendus culpa quae ducimus
            autem deleniti. Ipsa doloremque excepturi iure placeat facere nam
            sit perferendis, nisi impedit quaerat, similique eveniet enim quos,
            tempora nulla. Odio corrupti aut eum facilis laborum, harum suscipit
            doloribus deserunt quos placeat? Cupiditate in, delectus hic maiores
            quam esse, architecto debitis perspiciatis dolores suscipit soluta.
            Beatae eaque repellendus atque enim labore, voluptate dolore, earum
            cum accusantium impedit quidem commodi! Eaque, suscipit! Voluptatem.
            Reiciendis quo dolor dolores quod quam sit maxime error modi libero
            in praesentium voluptates, magni architecto aliquam beatae incidunt
            facere laborum quaerat necessitatibus facilis, temporibus cupiditate
            nesciunt! Perferendis, impedit possimus. Incidunt perspiciatis
            inventore a veniam nihil itaque molestiae reprehenderit quae ipsam
            reiciendis? Aperiam a maxime saepe laborum voluptatibus quas
            nostrum, quia expedita quo cum provident sunt tempore consequatur
            nulla reiciendis. Adipisci quidem ipsa, quas non totam dolore
            inventore! Consectetur libero suscipit tenetur debitis corrupti
            officia recusandae molestiae saepe accusamus tempore. Repellat
            explicabo illum aliquam laborum a beatae nisi, ratione nemo. Debitis
            est ratione aspernatur, praesentium rem quo aliquam vero enim culpa
            ad eos voluptates repellat quisquam ipsum harum quia ullam
            doloremque alias nesciunt deleniti atque, ab rerum! Ipsa,
            voluptatibus ut. Facere eligendi ipsam vel alias quos, soluta veniam
            officia tenetur, repellat aspernatur obcaecati qui placeat?
            Provident asperiores, voluptatum ex, natus voluptates sit ratione
            accusamus vel, dolor dolores libero aliquam enim?
          </div>
        </div>
        <div className={characterPageStyle.personality}>
          <span>Personality</span>
          <div className={characterPageStyle.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            eius asperiores placeat deleniti rem in tempore odit officia culpa?
            In rerum quis natus error. Dolorum culpa ipsa ipsum. Molestiae,
            consectetur! Voluptates, autem porro quia nesciunt non distinctio,
            iste illum, voluptatem laudantium molestiae minima in optio nulla?
            Saepe aliquid, explicabo reprehenderit labore veritatis quis odit
            placeat unde commodi quaerat magni facilis? Beatae ab ratione enim
            magnam molestias numquam. Placeat atque id voluptatibus ea?
            Doloribus corrupti debitis praesentium ullam aspernatur soluta
            libero. Odio amet alias voluptates repellendus culpa quae ducimus
            autem deleniti. Ipsa doloremque excepturi iure placeat facere nam
            sit perferendis, nisi impedit quaerat, similique eveniet enim quos,
            tempora nulla. Odio corrupti aut eum facilis laborum, harum suscipit
            doloribus deserunt quos placeat? Cupiditate in, delectus hic maiores
            quam esse, architecto debitis perspiciatis dolores suscipit soluta.
            Beatae eaque repellendus atque enim labore, voluptate dolore, earum
            cum accusantium impedit quidem commodi! Eaque, suscipit! Voluptatem.
            Reiciendis quo dolor dolores quod quam sit maxime error modi libero
            in praesentium voluptates, magni architecto aliquam beatae incidunt
            facere laborum quaerat necessitatibus facilis, temporibus cupiditate
            nesciunt! Perferendis, impedit possimus. Incidunt perspiciatis
            inventore a veniam nihil itaque molestiae reprehenderit quae ipsam
            reiciendis? Aperiam a maxime saepe laborum voluptatibus quas
            nostrum, quia expedita quo cum provident sunt tempore consequatur
            nulla reiciendis. Adipisci quidem ipsa, quas non totam dolore
            inventore! Consectetur libero suscipit tenetur debitis corrupti
            officia recusandae molestiae saepe accusamus tempore. Repellat
            explicabo illum aliquam laborum a beatae nisi, ratione nemo. Debitis
            est ratione aspernatur, praesentium rem quo aliquam vero enim culpa
            ad eos voluptates repellat quisquam ipsum harum quia ullam
            doloremque alias nesciunt deleniti atque, ab rerum! Ipsa,
            voluptatibus ut. Facere eligendi ipsam vel alias quos, soluta veniam
            officia tenetur, repellat aspernatur obcaecati qui placeat?
            Provident asperiores, voluptatum ex, natus voluptates sit ratione
            accusamus vel, dolor dolores libero aliquam enim?
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
