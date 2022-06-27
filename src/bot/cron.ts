import { CronJob } from "cron";

export interface Cron {
  start: (tab: string, callback: () => Promise<void>) => void;
}

export class SimpleCron implements Cron {
  public start(tab: string, callback: () => Promise<void>): void {
    const cron = new CronJob(tab, callback, null, false, "UTC");
    cron.start();
  }
}
