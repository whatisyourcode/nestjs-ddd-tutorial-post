import { ICommand } from "@nestjs/cqrs";

import CreateCommentReqDto from "../dtos/comment-req.dto/create-comment-req.dto";

export default class CommentCreateCommand implements ICommand {
  readonly createCommentReqDto: CreateCommentReqDto;

  constructor(createCommentReqDto: CreateCommentReqDto) {
    this.createCommentReqDto = createCommentReqDto;
  }
}
