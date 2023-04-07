import { FC } from "react";

import ItemInfo from "./ItemInfo";
import Card from "../../ui/cards/Card";

interface Props {
  originalTitle: string;
  seasonsCount?: number;
  chaptersCount?: number;
  seriesCount?: number;
  years: string;
  status: string;
  author: string;
  views: number;
}

const AnimeInfo: FC<Props> = ({
  originalTitle,
  seasonsCount,
  chaptersCount,
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
        value={originalTitle ? originalTitle : "Updating..."}
      />
      {chaptersCount ? (
        <ItemInfo
          label="Chapters Count"
          value={chaptersCount ? chaptersCount : "Updating..."}
        />
      ) : (
        <ItemInfo
          label="Seasons Count"
          value={seasonsCount ? seasonsCount : "Updating..."}
        />
      )}

      {seriesCount && (
        <ItemInfo
          label="Series Count"
          value={seriesCount ? seriesCount : "Updating..."}
        />
      )}

      <ItemInfo
        label="Years of releases"
        value={years ? years : "Updating..."}
      />
      <ItemInfo label="Status" value={status ? status : "Updating..."} />
      <ItemInfo label="Author" value={author ? author : "Updating...n"} />
      <ItemInfo label="Views" value={views ? views : "Updating..."} />
    </Card>
  );
};

export default AnimeInfo;
