import type { Article } from "../../types";
import dayjs from "dayjs";

type Props = {
  articles: Article[];
};

export const Articles = ({ articles }: Props) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.pubDate}>
          <time dateTime={dayjs(article.pubDate).format("YYYY-MM-DD")}>
            {dayjs(article.pubDate).format("YYYY年MM月DD日")}
          </time>{" "}
          <span>[{article.type}]</span>{" "}
          <a href={article.link} target="_blank" rel="noreferrer">
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
