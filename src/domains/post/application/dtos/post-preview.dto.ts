import { IsNotEmpty, IsString, IsNumber, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import AuthorDto from "@/domains/post/application/dtos/author.dto";

export default class PostPreviewDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AuthorDto)
  readonly author: AuthorDto;

  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  constructor(id: number, title: string, author: AuthorDto, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createdAt = createdAt;
  }
}
