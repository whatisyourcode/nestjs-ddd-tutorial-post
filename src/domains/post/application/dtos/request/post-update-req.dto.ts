import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import PostUpdateFormDto from "@/domains/post/application/dtos/post-update-form.dto";

export default class PostUpdateReqDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostUpdateFormDto)
  readonly post: PostUpdateFormDto;

  constructor(post: PostUpdateFormDto) {
    this.post = post;
  }
}
