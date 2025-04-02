import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

export default class PaginatedPostPreviewsResDto {
  @IsNotEmpty()
  @IsNumber()
  readonly totalPages: number;

  @IsNotEmpty()
  @IsNumber()
  readonly currentPage: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostPreviewDto)
  readonly posts: PostPreviewDto[];

  constructor(totalPages: number, currentPage: number, posts: PostPreviewDto[]) {
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.posts = posts;
  }
}
