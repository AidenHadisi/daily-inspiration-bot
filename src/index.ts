import "reflect-metadata";

import * as dotenv from "dotenv";

import { Bot } from "./bot/bot.js";
import { SimpleCron } from "./bot/cron.js";
import { TwitterConfigSchema } from "./clients/config.js";
import { TwitterApi } from "./clients/twitter.js";
import { JimpProcessor } from "./image/processor.js";
import { ZenQuotesApi } from "./quotes/api.js";

try {
  const env = dotenv.config().parsed;
  const config = TwitterConfigSchema.parse(env);
  const api = new ZenQuotesApi();
  const cron = new SimpleCron();
  const twitter = new TwitterApi(config);
  const image = new JimpProcessor();

  const bot = new Bot(twitter, api, cron, image);

  await bot.init();
} catch (e) {
  console.log("error starting bot", e);
}
