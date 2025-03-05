import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import CreatePostFormDto from "@/domains/post/application/dtos/create-post-form.dto";

export default class CreatePostReqDto {
  @IsNotEmpty()
  @IsNumber()
  readonly authorId: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePostFormDto)
  readonly post: CreatePostFormDto;

  constructor(authorId: number, post: CreatePostFormDto) {
    this.authorId = authorId;
    this.post = post;
  }
}
