import { HttpException, HttpStatus } from "@nestjs/common";

export default class InvalidTelFormatException extends HttpException {
  constructor() {
    super("invalid tel format", HttpStatus.BAD_REQUEST);
  }
}
