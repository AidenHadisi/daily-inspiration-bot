import "reflect-metadata";

import * as dotenv from "dotenv";

import { Bot } from "./bot/bot.js";
import { SimpleCron } from "./bot/cron.js";
import { TwitterConfig, TwitterConfigSchema } from "./clients/config.js";
import { TwitterApi } from "./clients/twitter.js";
import { JimpProcessor } from "./image/processor.js";
import { ZenQuotesApi } from "./quotes/api.js";

try {
  const env: TwitterConfig = {
    TWITTER_USERNAME: process.env.TWITTER_USERNAME ?? "",
    CONSUMER_KEY: process.env.CONSUMER_KEY ?? "",
    CONSUMER_SECRET: process.env.CONSUMER_SECRET ?? "",
    ACCESS_SECRET: process.env.ACCESS_SECRET ?? "",
    ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? "",
  };
  const config = TwitterConfigSchema.parse(env);
  const api = new ZenQuotesApi();
  const cron = new SimpleCron();
  const twitter = new TwitterApi(config);
  const image = new JimpProcessor();

  const bot = new Bot(twitter, api, cron, image);

  await bot.post();
} catch (e) {
  console.log("error starting bot", e);
}
