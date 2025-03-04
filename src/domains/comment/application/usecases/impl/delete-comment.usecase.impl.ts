import { Inject } from "@nestjs/common";

import DeleteCommentUsecase from "../delete-comment.usecase";
import CommentService, { COMMENT_SERVICE } from "@/domains/comment/domain/services/comment.service";

export default class DeleteCommentUsecaseImpl implements DeleteCommentUsecase {
  constructor(@Inject(COMMENT_SERVICE) private readonly commentService: CommentService) {}

  async execute(commentId: number): Promise<void> {
    this.commentService.deleteComment(commentId);
  }
}
