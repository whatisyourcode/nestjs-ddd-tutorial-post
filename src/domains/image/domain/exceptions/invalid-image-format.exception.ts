import { HttpException, HttpStatus } from "@nestjs/common";

export default class InvalidImageFormatException extends HttpException {
  constructor() {
    super("invalid image format", HttpStatus.BAD_REQUEST);
  }
}
