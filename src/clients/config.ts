import { z } from "zod";

//TwitterConfigSchema is a zod validator schema for validating our twitter configs.
export const TwitterConfigSchema = z.object({
  TWITTER_USERNAME: z.string().min(1),
  CONSUMER_KEY: z.string().min(1),
  CONSUMER_SECRET: z.string().min(1),
  ACCESS_TOKEN: z.string().min(1),
  ACCESS_SECRET: z.string().min(1),
});

//TwitterConfig is type for twitter configurations.
export type TwitterConfig = Readonly<z.infer<typeof TwitterConfigSchema>>;
