import { HttpException, HttpStatus } from "@nestjs/common";

export default class PostNotFoundException extends HttpException {
  constructor() {
    super("post not found", HttpStatus.NOT_FOUND);
  }
}
