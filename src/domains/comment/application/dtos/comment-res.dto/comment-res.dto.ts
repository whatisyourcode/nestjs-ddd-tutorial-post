import { Type } from "class-transformer";

import { CommentDetailDto } from "../comment-detail.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";

export default class CommentResDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CommentDetailDto)
  readonly comment: CommentDetailDto;

  constructor(comment: CommentDetailDto) {
    this.comment = comment;
  }
}
