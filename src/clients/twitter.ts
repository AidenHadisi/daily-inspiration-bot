import { EUploadMimeType, TwitterApi as TApi } from "twitter-api-v2";

import type { Client } from "./client";
import type { TwitterConfig } from "./config";

export class TwitterApi implements Client {
  private readonly _client: TApi;

  constructor(config: TwitterConfig) {
    this._client = new TApi({
      appKey: config.CONSUMER_KEY,
      appSecret: config.CONSUMER_SECRET,
      accessToken: config.ACCESS_TOKEN,
      accessSecret: config.ACCESS_SECRET,
    });
  }

  public async connect() {
    await this._client.appLogin();
  }

  public async post(image: Buffer) {
    const mediaId = await this._client.v1.uploadMedia(image, {
      mimeType: EUploadMimeType.Png,
    });

    const createdTweet = await this._client.v2.tweet("", {
      media: {
        media_ids: [mediaId],
      },
    });
    console.log("Tweet Sent:", createdTweet.data.id, ":", Date.now());
  }
}
