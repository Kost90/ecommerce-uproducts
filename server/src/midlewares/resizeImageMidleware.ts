import sharp from "sharp";
import { Response, Request } from "express";

export default function resizeImage(req: Request, res: Response, next: any) {
  if (!req.file) {
    return next(console.log("No file uploaded"));
  }
  sharp(req.file.buffer)
    .resize(420, 340)
    .toBuffer((err, buffer) => {
      if (err) {
        return next(err);
      }
      req.file!.buffer = buffer;
      next();
    });
}
