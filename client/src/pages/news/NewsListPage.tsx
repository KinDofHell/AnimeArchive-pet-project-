import newsStyle from "./NewsStyle.module.scss";

import { useEffect, Key } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchNews } from "../../redux/slices/news";
import { isNewsModerator } from "../../redux/slices/user";

import Searchbar from "../../components/searchtools/Searchbar";
import Button from "../../components/ui copy/buttons/Button";
import ProductCard from "../../components/productCard/ProductCard";

const NewsListPage = () => {
  const isNewsMod: boolean | undefined = useSelector(isNewsModerator);

  const dispatch = useDispatch<any>();

  const { news } = useSelector((state: any) => state.news);
  const isLoading: boolean = news.status === "loading";

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  useEffect(() => {
    const block = document.getElementById("content") as HTMLElement;
    let scroll: string | null = "";
    if (localStorage.getItem("scroll")) scroll = localStorage.getItem("scroll");
    const scrollNum: number = scroll ? parseInt(scroll) : 0;
    if (scrollNum) block.scrollTop = scrollNum;
    block.addEventListener("scroll", function () {
      localStorage.setItem("scroll", JSON.stringify(block.scrollTop));
    });
  }, []);

  return (
    <div className={newsStyle.news__list__page}>
      <div className={newsStyle.search__tools}>
        <div className={newsStyle.searchbar}>
          <Searchbar placeholder="Enter the title..." />
        </div>
        <div className={newsStyle.btn__group__tools}>
          <Button label="Important" />
          <Button label="Popular" />
        </div>
        {isNewsMod && <Button label="Add News" linkPath="/news-adding/" />}
      </div>
      <div className={newsStyle.content} id="content">
        {!isLoading &&
          news.items.map((obj: typeof news | undefined, index: Key) => (
            <ProductCard
              _id={obj._id}
              title={obj.title}
              linkPath={obj._id}
              isAnime={false}
              isNews={true}
              isEditable={isNewsMod}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default NewsListPage;
