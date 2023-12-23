import type { Article } from "../../types";
import dayjs from "dayjs";

type Props = {
  articles: Article[];
};

const typeMap: Record<Article["type"], string> = {
  note: "note",
  zenn: "Zenn",
  sizume: "sizu.me",
};

export const Articles = ({ articles }: Props) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.pubDate}>
          <time dateTime={dayjs(article.pubDate).format("YYYY-MM-DD")}>
            {dayjs(article.pubDate).format("YYYY年MM月DD日")}
          </time>{" "}
          <span>[{typeMap[article.type]}]</span>{" "}
          <a href={article.link} target="_blank">
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
