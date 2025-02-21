import { HttpException, HttpStatus } from "@nestjs/common";

export default class IntroductionLengthExceededException extends HttpException {
  constructor() {
    super("introduction exceeds the maximum allowed length", HttpStatus.BAD_REQUEST);
  }
}
