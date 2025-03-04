import { Type } from "class-transformer";

import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { UpdateCommentDto } from "../update-comment.dto";

export default class UpdateCommentReqDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateCommentDto)
  readonly comment: UpdateCommentDto;

  constructor(comment: UpdateCommentDto) {
    this.comment = comment;
  }
}
