import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import CreatePostFormDto from "@/domains/post/application/dtos/create-post-form.dto";

export default class CreatePostReqDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePostFormDto)
  readonly post: CreatePostFormDto;

  constructor(authorId: number, post: CreatePostFormDto) {
    this.post = post;
  }
}
