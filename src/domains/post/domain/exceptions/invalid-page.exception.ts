import { HttpException, HttpStatus } from "@nestjs/common";

export default class InvalidPageException extends HttpException {
  constructor() {
    super("invalid page", HttpStatus.BAD_REQUEST);
  }
}
