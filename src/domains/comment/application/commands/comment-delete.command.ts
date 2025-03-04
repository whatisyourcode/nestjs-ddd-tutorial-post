import { ICommand } from "@nestjs/cqrs";

export default class CommentDeleteCommand implements ICommand {
  readonly commentId: number;

  constructor(commentId: number) {
    this.commentId = commentId;
  }
}
