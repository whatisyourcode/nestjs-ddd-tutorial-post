import { HttpException, HttpStatus } from "@nestjs/common";

export default class InvalidTelLengthException extends HttpException {
  constructor() {
    super("invalid tel length", HttpStatus.BAD_REQUEST);
  }
}
