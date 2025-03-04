import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import PostCreateFormDto from "@/domains/post/application/dtos/post-create-form.dto";

export default class PostCreateReqDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostCreateFormDto)
  readonly post: PostCreateFormDto;

  constructor(post: PostCreateFormDto) {
    this.post = post;
  }
}
