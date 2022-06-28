import type { Client } from "../clients/client";
import type { ImageProcessor } from "../image/processor";
import type { QuoteGetter } from "../quotes/api";
import type { Cron } from "./cron";

export class Bot {
  private readonly client: Client;
  private readonly quotesApi: QuoteGetter;
  private readonly cron: Cron;
  private readonly imageProcessor: ImageProcessor;

  constructor(
    client: Client,
    quotesApi: QuoteGetter,
    cron: Cron,
    imageProcessor: ImageProcessor
  ) {
    this.client = client;
    this.quotesApi = quotesApi;
    this.cron = cron;
    this.imageProcessor = imageProcessor;
  }

  public async init() {
    try {
      await this.client.connect();
      await this.post();
      this.cron.start("0 */8 * * *", this.post);
    } catch (e) {
      console.log(e);
    }
  }

  public async post(): Promise<void> {
    try {
      const quote = await this.quotesApi.GetRandomQuote();

      const message = <Uppercase<string>>(
        `${quote.text.toUpperCase()} - ${quote.author.toUpperCase()}`
      );
      const image = await this.imageProcessor.writeOnRandomImage(message);

      await this.client.post(image);
    } catch (e) {
      console.log("failed to sent message", e);
    }
  }
}
