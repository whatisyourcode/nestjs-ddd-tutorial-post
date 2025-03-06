import { IQuery } from "@nestjs/cqrs";

export default class GetPostDetailQuery implements IQuery {
  readonly postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }
}
