import { ICommand } from "@nestjs/cqrs";

import UpdateCommentReqDto from "../dtos/comment-req.dto/update-comment-req.dto";

export default class CommentUpdateCommand implements ICommand {
  readonly commentId: number;
  readonly updateCommentReqDto: UpdateCommentReqDto;

  constructor(commentId: number, updateCommentReqDto: UpdateCommentReqDto) {
    this.commentId = commentId;
    this.updateCommentReqDto = updateCommentReqDto;
  }
}
