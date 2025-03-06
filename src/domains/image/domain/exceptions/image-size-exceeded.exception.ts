import { HttpException, HttpStatus } from "@nestjs/common";

export default class ImageSizeExceededException extends HttpException {
  constructor() {
    super("image exceeds the maximum allowed size", HttpStatus.BAD_REQUEST);
  }
}
