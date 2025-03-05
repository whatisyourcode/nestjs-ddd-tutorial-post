import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

export default class PaginatedPostPreviewsResDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostPreviewDto)
  readonly posts: PostPreviewDto[];

  constructor(posts: PostPreviewDto[]) {
    this.posts = posts;
  }
}
