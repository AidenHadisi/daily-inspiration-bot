import Jimp from "jimp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export interface ImageProcessor {
  writeOnRandomImage: (text: Uppercase<string>) => Promise<Buffer>;
}

export class JimpProcessor implements ImageProcessor {
  readonly randomImageUrl: string = "https://picsum.photos/1200/625";

  public async writeOnRandomImage(text: Uppercase<string>): Promise<Buffer> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    //get the font.
    const font = await Jimp.loadFont(join(__dirname, "./font.fnt"));

    //read the image
    const result = await Jimp.read(this.randomImageUrl);

    //print the text
    result.brightness(-0.4).print(
      font,
      0,
      0,
      {
        text: text.toUpperCase(),
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      },
      1100,
      600
    );

    //return buffer
    const buffer = await result.getBufferAsync(Jimp.MIME_PNG);
    return buffer;
  }
}
