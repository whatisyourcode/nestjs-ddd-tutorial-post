import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

import { CommentDetailDto } from "../comment-detail.dto";

export default class CommentListResDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CommentDetailDto)
  readonly comments: CommentDetailDto[];

  constructor(comments: CommentDetailDto[]) {
    this.comments = comments;
  }
}
