import { FC } from "react";

import ItemInfo from "./ItemInfo";
import Card from "../../ui/cards/Card";

interface Props {
  originalTitle: string;
  seasonsCount: number;
  seriesCount: number;
  years: string;
  status: string;
  author: string;
  views: number;
}

const AnimeInfo: FC<Props> = ({
  originalTitle,
  seasonsCount,
  seriesCount,
  years,
  status,
  author,
  views,
}) => {
  return (
    <Card
      title="Info"
      flexColumn={true}
      flexContentColumn={true}
      maxWidth_Height={true}
    >
      <ItemInfo
        label="Original Title"
        value={originalTitle ? originalTitle : "Will be soon"}
      />
      <ItemInfo
        label="Seasons Count"
        value={seasonsCount ? seasonsCount : "Will be soon"}
      />
      <ItemInfo
        label="Series Count"
        value={seriesCount ? seriesCount : "Will be soon"}
      />
      <ItemInfo
        label="Years of releases"
        value={years ? years : "Will be soon"}
      />
      <ItemInfo label="Status" value={status ? status : "Will be soon"} />
      <ItemInfo label="Author" value={author ? author : "Will be soon"} />
      <ItemInfo label="Views" value={views ? views : "Will be soon"} />
    </Card>
  );
};

export default AnimeInfo;
