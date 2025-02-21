import { HttpException, HttpStatus } from "@nestjs/common";

export default class UlidAlreadyExistsException extends HttpException {
  constructor() {
    super("ulid has already been assigned", HttpStatus.CONFLICT);
  }
}
