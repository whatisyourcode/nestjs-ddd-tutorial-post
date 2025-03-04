import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { CreateCommentDto } from "../create-comment.dto";

export default class CreateCommentReqDto {
  @IsNotEmpty()
  @IsNumber()
  readonly postId: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCommentDto)
  readonly comment: CreateCommentDto;

  constructor(postId: number, comment: CreateCommentDto) {
    this.postId = postId;
    this.comment = comment;
  }
}
