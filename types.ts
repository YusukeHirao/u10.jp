import type { MicroCMSListContent } from "microcms-js-sdk";

export type Article = {
  type: "note" | "zenn";
  title: string;
  link: string;
  pubDate: string;
};

export type Speak = MicroCMSListContent & {
  date: string;
  eventUrl: string;
  eventName: string;
  slideUrl?: string;
  sessionTitle: string;
  videoArchiveUrl?: string;
};
