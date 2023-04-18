import productPageStyle from "./ProductPage.module.scss";
import { SERVER_HOST } from "../../data/Constant";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, Key } from "react";

import axios from "../../utils/axios";

import { isAuthenticated } from "../../redux/slices/user";

import LabeledContainer from "../../components/labeledContainer/LabeledContainer";
import ShortcutSpan from "../../components/shortcutSpan/ShortcutSpan";
import Image from "../../components/ui copy/images/Image";
import NameValueSpan from "../../components/nameValueSpan/NameValueSpan";

const ProductPage = ({ isAnime }: { isAnime: boolean }) => {
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);

  const isAuth = useSelector(isAuthenticated);
  const { user } = useSelector((state: any) => state);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<string>();

  const [isSelected, setIsSelected] = useState<boolean>(
    isAnime
      ? isAuth && user.data.watchedAnime && user.data.watchedAnime.includes(id)
      : isAuth && user.data.ReadManga && user.data.ReadManga.includes(id)
  );

  const onClickAdd = async () => {
    try {
      let fields: object = {};
      if (isAnime) {
        fields = {
          watchedAnime: id,
        };
      } else {
        fields = {
          ReadManga: id,
        };
      }
      await axios.patch("/user", fields);
      setIsSelected(true);
    } catch (error) {
      alert(`Error selecting ${isAnime ? "anime" : "manga"}`);
      console.warn(error);
    }
  };
  const onClickRemove = async () => {
    try {
      let fields: object = {};
      if (isAnime) {
        fields = {
          watchedAnime: id,
        };
      } else {
        fields = {
          ReadManga: id,
        };
      }
      await axios.patch("/watched-list", fields);
      setIsSelected(false);
    } catch (error) {
      alert(`Error deselecting ${isAnime ? "anime" : "manga"}`);
      console.warn(error);
    }
  };

  useEffect(() => {
    axios
      .get(`/${isAnime ? "anime" : "manga"}/${id}`)
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
      <div className={productPageStyle.product__page}>
        <div className={productPageStyle.related}>
          <LabeledContainer label="Chracters">
            <ShortcutSpan title="Eren Yeager" linkPath="/characters/" />
            <ShortcutSpan title="Mikasa Akkerman" linkPath="/characters/" />
            <ShortcutSpan title="Erwin Smith" linkPath="/characters/" />
            <ShortcutSpan title="Levi Akkerman" linkPath="/characters/" />
          </LabeledContainer>
          <LabeledContainer label="Categories">
            {data.categoriesArray.map((obj: any, index: Key) => (
              <ShortcutSpan title={obj.title} linkPath="/anime/" key={index} />
            ))}
            {!data.categoriesArray && (
              <ShortcutSpan title="Post-Apocalyptic" linkPath="/anime/" />
            )}
          </LabeledContainer>
        </div>
        <div className={productPageStyle.main__info}>
          {isAuth && (
            <div
              className={productPageStyle.selection}
              style={
                isSelected
                  ? { backgroundColor: "darkred" }
                  : { backgroundColor: "darkgreen" }
              }
              onClick={isSelected ? onClickRemove : onClickAdd}
            >
              {isSelected ? "Remove from list" : "Add to list"}
            </div>
          )}
          <div className={productPageStyle.image}>
            {descriptionOpen ? (
              <div
                className={productPageStyle.description__close}
                id="closeDescription"
                onClick={() => setDescriptionOpen(false)}
              >
                X
              </div>
            ) : (
              <div
                className={productPageStyle.description}
                id="openDescription"
                onClick={() => setDescriptionOpen(true)}
              >
                ?
              </div>
            )}
            {descriptionOpen && (
              <div className={productPageStyle.description__text}>
                {data.description ? data.description : "Loading..."}
              </div>
            )}
            <Image
              imgLink={SERVER_HOST + data.imgCover}
              minWidth="100%"
              maxWidth="100%"
              minHeight="22vw"
              maxHeight="22vw"
              allBordered={true}
            />
          </div>
          <span className={productPageStyle.title}>
            {data.title ? data.title : "Loading..."}
          </span>
          <NameValueSpan
            name="Original Title"
            value={data.originalTitle}
            minWidth="60%"
          />
          {isAnime ? (
            <NameValueSpan name="Seasons" value={data.seasons} minWidth="60%" />
          ) : (
            <NameValueSpan
              name="Chapters"
              value={data.chapters}
              minWidth="60%"
            />
          )}

          {isAnime && (
            <NameValueSpan name="Series" value={data.series} minWidth="60%" />
          )}
          <NameValueSpan
            name="Years"
            value={data.years.join(",")}
            minWidth="60%"
          />
          <NameValueSpan
            name="Status"
            value={data.status.title}
            minWidth="60%"
          />
          <ShortcutSpan
            title={data.author.fullname}
            linkPath={`/creator/${data.author._id}`}
            imgLink={data.author.imgUrl && SERVER_HOST + data.author.imgUrl}
            backForTitle={true}
          />
        </div>
        <div className={productPageStyle.addtional__imgs}>
          {data.imgAdditional_1 && (
            <Image
              imgLink={SERVER_HOST + data.imgAdditional_1}
              minWidth="15vw"
              minHeight="10vw"
              maxWidth="15vw"
              allBordered={true}
            />
          )}
          {data.imgAdditional_2 && (
            <Image
              imgLink={SERVER_HOST + data.imgAdditional_2}
              minWidth="15vw"
              minHeight="10vw"
              maxWidth="15vw"
              allBordered={true}
            />
          )}
          {data.imgAdditional_3 && (
            <Image
              imgLink={SERVER_HOST + data.imgAdditional_3}
              minWidth="15vw"
              minHeight="10vw"
              maxWidth="15vw"
              allBordered={true}
            />
          )}
        </div>
      </div>
    );
  else return null;
};

export default ProductPage;
