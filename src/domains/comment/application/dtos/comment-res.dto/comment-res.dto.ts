import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import CommentDetailDto from "../comment-detail.dto";

export default class CommentResDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CommentDetailDto)
  readonly comment: CommentDetailDto;

  constructor(comment: CommentDetailDto) {
    this.comment = comment;
  }
}
