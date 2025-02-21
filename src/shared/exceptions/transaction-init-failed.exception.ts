import { HttpException, HttpStatus } from "@nestjs/common";

export default class TransactionInitFailedException extends HttpException {
  constructor() {
    super("failed to initialize the transaction", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
