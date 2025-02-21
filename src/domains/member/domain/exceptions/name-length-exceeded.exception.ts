import { HttpException, HttpStatus } from "@nestjs/common";

export default class NameLengthExceededException extends HttpException {
  constructor() {
    super("name exceeds the maximum allowed length", HttpStatus.BAD_REQUEST);
  }
}
