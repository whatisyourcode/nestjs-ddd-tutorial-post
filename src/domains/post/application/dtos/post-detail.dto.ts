import { IsNotEmpty, IsString, IsNumber, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import AuthorDto from "@/domains/post/application/dtos/author.dto";

export default class PostDetailDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AuthorDto)
  readonly author: AuthorDto;

  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @IsNotEmpty()
  @IsString()
  readonly isDeleted: boolean;

  constructor(id: number, title: string, content: string, author: AuthorDto, createdAt: Date, isDeleted: boolean) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
  }
}
