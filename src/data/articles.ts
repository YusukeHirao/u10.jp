import Parser from "rss-parser";
import dayjs from "dayjs";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
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
  const notePage = await fetch("https://note.com/yusukehirao");
  const noteHtml = await notePage.text();
  const noteDom = new JSDOM(noteHtml);
  const noteTitles = noteDom.window.document.querySelectorAll(
    "h3.m-noteBody__title:not(.line-clamp-2)",
  );
  const noteData = Array.from(noteTitles).map<Article>((el) => {
    const title = el.textContent?.trim() || "";
    const section = el.closest("section");
    const href = section?.querySelector("a")?.href;
    const date = section?.querySelector("time")?.getAttribute("datetime") || "";
    return {
      type: "note",
      title,
      link: `https://note.com${href}`,
      pubDate: date,
    };
  });

  return noteData;
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
