export interface Client {
  post: (image: Buffer) => Promise<void>;
  connect: () => Promise<void>;
}
