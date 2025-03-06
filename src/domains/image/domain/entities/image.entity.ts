import { v4 } from "uuid";
import { extname } from "path";

import { allowedTypes, maxSize } from "@/domains/image/domain/constants/image.constraint";
import InvalidImageFormatException from "@/domains/image/domain/exceptions/invalid-image-format.exception";
import ImageSizeExceededException from "@/domains/image/domain/exceptions/image-size-exceeded.exception";

interface ImageProps {
  image: Express.Multer.File;
}

export default class ImageEntity {
  private image: Express.Multer.File;

  private constructor(image: Express.Multer.File) {
    this.image = image;
  }

  static create({ image }: ImageProps): ImageEntity {
    if (!allowedTypes.includes(image.mimetype)) {
      throw new InvalidImageFormatException();
    }

    if (image.size > maxSize) {
      throw new ImageSizeExceededException();
    }

    return new ImageEntity(image);
  }

  getImage(): Express.Multer.File {
    return this.image;
  }

  getBuffer(): Buffer {
    return this.image.buffer;
  }

  getContentType(): string {
    return this.image.mimetype;
  }

  getOriginalName(): string {
    return this.image.originalname;
  }

  createImageName(): string {
    const originalName: string = this.getOriginalName();
    const imageExtension: string = extname(originalName);

    return `${v4()}${imageExtension}`;
  }
}
