import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

import type { Quote } from "./quote";

export interface QuoteGetter {
  GetRandomQuote: () => Promise<Quote>;
}

type ZenQuote = {
  a: string;
  h: string;
  q: string;
};

export class ZenQuotesApi implements QuoteGetter {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://zenquotes.io/api",
      timeout: 5000,
    });
  }

  /**
   * gets a random quote from the api
   * @returns Quote
   * @throws Error
   */
  public async GetRandomQuote(): Promise<Quote> {
    const result: AxiosResponse<ZenQuote[], undefined> = await this.client.get(
      "/random"
    );
    return { author: result.data[0].a, text: result.data[0].q };
  }
}
