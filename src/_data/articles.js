const Parser = require("rss-parser");
const dayjs = require("dayjs");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

const parser = new Parser();

module.exports = async function () {
  const zenn = await parser.parseURL("https://zenn.dev/yusukehirao/feed");
  const notePage = await fetch("https://note.com/yusukehirao");
  const noteHtml = await notePage.text();
  const noteDom = new JSDOM(noteHtml);
  const noteTitles = noteDom.window.document.querySelectorAll(
    "h3.m-noteBody__title"
  );
  const noteData = Array.from(noteTitles).map((el) => {
    const title = el.textContent.trim();
    const section = el.closest("section");
    const href = section?.querySelector("a")?.href;
    const date = section?.querySelector("time")?.getAttribute("datetime");
    return {
      type: "note",
      title,
      link: `https://note.com${href}`,
      pubDate: date,
    };
  });

  const data = [
    ...zenn.items.map((item) => ({ ...item, type: "zenn" })),
    ...noteData,
  ];
  data.sort((a, b) => {
    return dayjs(b.pubDate).unix() - dayjs(a.pubDate).unix();
  });

  return data;
};
