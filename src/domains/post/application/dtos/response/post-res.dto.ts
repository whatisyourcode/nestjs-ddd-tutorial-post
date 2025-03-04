import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import PostDto from "@/domains/post/application/dtos/post.dto";

export default class PostResDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostDto)
  readonly post: PostDto;

  constructor(post: PostDto) {
    this.post = post;
  }
}
