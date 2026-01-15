import Parser from "rss-parser";
import dayjs from "dayjs";
import type { Article } from "../../types";

const parser = new Parser<Omit<Article, "type">>();

export async function fetchArticles(): Promise<Article[]> {
  const zenn = await fetchZenn();
  const note = await fetchNote();
  const sizume = await fetchSizume();

  const data: Article[] = [...zenn, ...note, ...sizume];
  data.sort((a, b) => {
    return dayjs(b.pubDate).unix() - dayjs(a.pubDate).unix();
  });

  return data;
}

async function fetchZenn(): Promise<Article[]> {
  const articles = await parser.parseURL("https://zenn.dev/yusukehirao/feed");
  return articles.items.map((item) => ({
    ...item,
    type: "zenn",
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate ?? "",
  }));
}

async function fetchNote() {
  const rss = await parser.parseURL("https://note.com/yusukehirao/rss");
  const nodeData = rss.items.map<Article>((item) => ({
    type: "note",
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate ?? "",
  }));
  return nodeData;
}

async function fetchSizume(): Promise<Article[]> {
  const articles = await parser.parseURL("https://sizu.me/yusukehirao/rss");
  return articles.items.map((item) => ({
    ...item,
    type: "sizume",
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate ?? "",
  }));
}
