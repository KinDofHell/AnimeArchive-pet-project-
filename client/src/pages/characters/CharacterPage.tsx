import characterPageStyle from "./CharacterPage.module.scss";
import reservImg from "../../assets/imgs/logo.png";

import { useEffect, Key, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "../../utils/axios";

import Image from "../../components/ui copy/images/Image";
import NameValueSpan from "../../components/nameValueSpan/NameValueSpan";
import LabeledContainer from "../../components/labeledContainer/LabeledContainer";
import ShortcutSpan from "../../components/shortcutSpan/ShortcutSpan";

const CharacterPage = () => {
  const { id } = useParams<string>();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`/character/${id}`)
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
      <div className={characterPageStyle.character__page}>
        <div className={characterPageStyle.left__bar}>
          <Image imgLink={reservImg} height="12vw" width="12vw" />
          <span className={characterPageStyle.name}>Naruto Uzumaki</span>
          <div className={characterPageStyle.info}>
            <NameValueSpan name="Age" value={data.age} minWidth="100%" />
            <NameValueSpan name="Sex" value={data.sex} minWidth="100%" />
            <NameValueSpan name="Race" value={data.race} minWidth="100%" />
            <NameValueSpan
              name="Status"
              value={data.status}
              minWidth="100%"
              isHidden={true}
            />
          </div>
          <LabeledContainer label="Partners">
            {data.partners && data.partners.length > 0 ? (
              data.partners.map((partner: typeof data.partners) => {
                <ShortcutSpan
                  title={partner.fullName}
                  linkPath={`/characters/${partner._id}`}
                />;
              })
            ) : (
              <ShortcutSpan title="Characters" linkPath="/characters/" />
            )}
          </LabeledContainer>
        </div>
        <div className={characterPageStyle.right__bar}>
          <div className={characterPageStyle.appearance}>
            <span>Appearance</span>
            <div className={characterPageStyle.content}>{data.appearance}</div>
          </div>
          <div className={characterPageStyle.personality}>
            <span>Personality</span>
            <div className={characterPageStyle.content}>{data.personality}</div>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default CharacterPage;
