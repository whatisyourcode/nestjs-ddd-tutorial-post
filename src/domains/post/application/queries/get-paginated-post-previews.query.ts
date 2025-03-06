import { IQuery } from "@nestjs/cqrs";

export default class GetPaginatedPostPreviewsQuery implements IQuery {
  readonly page: number;

  constructor(page: number) {
    this.page = page;
  }
}
