import { HttpException, HttpStatus } from "@nestjs/common";

export default class MemberNotFoundException extends HttpException {
  constructor() {
    super("member not found", HttpStatus.NOT_FOUND);
  }
}
