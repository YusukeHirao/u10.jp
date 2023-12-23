import dotenv from "dotenv";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { Speak } from "../../types";

dotenv.config();

const client = createClient({
  serviceDomain: "u10",
  apiKey: process.env.MICRO_CMS_API_KEY!,
});

export async function fetchSpeaks() {
  const speaks = await client.get<MicroCMSListResponse<Speak>>({
    endpoint: "speaks",
    queries: {
      orders: "-date",
      limit: 1000,
    },
  });

  return speaks.contents;
}
