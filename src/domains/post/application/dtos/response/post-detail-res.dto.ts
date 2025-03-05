import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import PostDetailDto from "@/domains/post/application/dtos/post-detail.dto";

export default class PostDetailResDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostDetailDto)
  readonly post: PostDetailDto;

  constructor(post: PostDetailDto) {
    this.post = post;
  }
}
