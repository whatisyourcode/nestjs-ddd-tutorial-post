import { HttpException, HttpStatus } from "@nestjs/common";

export default class ImageUploadFailedException extends HttpException {
  constructor() {
    super("image upload failed", HttpStatus.BAD_REQUEST);
  }
}
